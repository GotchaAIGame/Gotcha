package org.a602.gotcha.domain.participant.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.exception.ParticipantNotFoundException;
import org.a602.gotcha.domain.participant.exception.UpdateParticipantFailedException;
import org.a602.gotcha.domain.participant.repository.ParticipantQueryRepository;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.*;
import org.a602.gotcha.domain.participant.response.ParticipantInfoResponse;
import org.a602.gotcha.domain.participant.response.ParticipantRankListResponse;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.participant.exception.ParticipantLoginFailedException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final ParticipantQueryRepository participantQueryRepository;
    private final RoomRepository roomRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Boolean existDuplicateNickname(DuplicateNicknameRequest request) {
        checkRoomValidation(request.getRoomId());
        return checkDuplicateNickname(request.getRoomId(), request.getNickname());
    }

    @Transactional
    public Participant registerParticipant(ParticipantRegisterRequest request) {
        Room room = findRoom(request.getRoomId());
        checkDuplicateNickname(request.getRoomId(), request.getNickname());
        final String hashPassword = encodePassword(request.getPassword());
        return participantRepository.save(
                Participant.builder()
                        .nickname(request.getNickname())
                        .password(hashPassword)
                        .room(room)
                        .isFinished(false)
                        .build());
    }

    @Transactional(readOnly = true)
    public ParticipantInfoResponse getParticipantInfo(ParticipantLoginRequest request) {
        checkRoomValidation(request.getRoomId());
        Participant participant = findParticipant(request.getRoomId(), request.getNickname());
        if (matchPassword(request.getPassword(), participant.getPassword())) {
            return ParticipantInfoResponse.builder()
                    .isFinished(participant.getIsFinished())
                    .startTime(participant.getStartTime())
                    .build();
        } else throw new ParticipantLoginFailedException();
    }

    @Transactional
    public boolean updateStartTime(ParticipantGameStartRequest request) {
        checkRoomValidation(request.getRoomId());
        Participant participant = findParticipant(request.getRoomId(), request.getNickname());
        participant.updateStartTime(request.getStartTime());
        if (participant.getStartTime().equals(request.getStartTime())) {
            return true;
        }
        throw new UpdateParticipantFailedException();
    }

    @Transactional(readOnly = true)
    public boolean checkUserValidation(Long roomId, String nickname) {
        checkRoomValidation(roomId);
        checkParticipantValidation(roomId, nickname);
        return true;
    }

    @Transactional
    public boolean updateGameRecord(ProblemFinishRequest request) {
        checkRoomValidation(request.getRoomId());
        Participant participant = findParticipant(request.getRoomId(), request.getNickname());
        // Duration 계산
        Duration duration = Duration.between(participant.getStartTime(), request.getEndTime());
        participant.registerRecord(request.getSolvedCnt(), request.getEndTime(), duration, true);
        // 잘 업데이트 되었는지 확인
        if (participant.getIsFinished()
                && participant.getEndTime().equals(request.getEndTime())
                && participant.getDuration().equals(duration)
                && participant.getSolvedCnt().equals(request.getSolvedCnt())) {
            return true;
        } else {
            throw new UpdateParticipantFailedException();
        }
    }

    @Transactional
    public boolean updatePhoneNumber(RegisterPhonenumberRequest request) {
        checkRoomValidation(request.getRoomId());
        Participant participant = findParticipant(request.getRoomId(), request.getNickname());
        participant.updatePhoneNumber(request.getPhoneNumber());
        if (participant.getPhoneNumber().equals(request.getPhoneNumber())) {
            return true;
        } else {
            throw new UpdateParticipantFailedException();
        }
    }

    @Transactional(readOnly = true)
    public List<ParticipantRankListResponse> getRankList(RankInfoRequest request) {
        checkRoomValidation(request.getRoomId());
        Participant participant = findParticipant(request.getRoomId(), request.getNickname());
        // 랭킹을 3위까지 가져오기
        List<Participant> top3ParticipantList = participantQueryRepository.getTop3Rank(request.getRoomId());
        // 랭킹 3위까지 돌면서 목록 만들어주고 3위 안에 유저가 있으면 바로 목록 넘기기
        List<ParticipantRankListResponse> result = new ArrayList<>();
        boolean flag = false;
        for (int i = 0; i < 3; i++) {
            Participant curr = top3ParticipantList.get(i);
            if (curr.getNickname().equals(request.getNickname())) {
                flag = true;
                result.add(ParticipantRankListResponse.builder()
                        .grade(i + 1L)
                        .nickname(curr.getNickname())
                        .duration(convertDuration(curr.getDuration()))
                        .isUser(true)
                        .build());
            } else {
                result.add(ParticipantRankListResponse.builder()
                        .grade(i + 1L)
                        .nickname(curr.getNickname())
                        .duration(convertDuration(curr.getDuration()))
                        .isUser(false)
                        .build());
            }
        }
        // 3등 안에 유저가 없다면 유저 등수를 찾아 더하여 반환
        if(!flag) {
            Long grade = participantQueryRepository.getParticipantRank(request.getRoomId(), participant.getId());
            result.add(ParticipantRankListResponse.builder()
                    .grade(grade)
                    .nickname(participant.getNickname())
                    .duration(convertDuration(participant.getDuration()))
                    .isUser(true)
                    .build());
        }
        return result;
    }

    private void checkRoomValidation(Long roomID) {
        roomRepository.findById(roomID)
                .orElseThrow(RoomNotFoundException::new);
    }

    private void checkParticipantValidation(Long roomId, String nickname) {
        participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname)
                .orElseThrow(ParticipantNotFoundException::new);
    }

    private Room findRoom(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
    }

    private Participant findParticipant(Long roomId, String nickname) {
        return participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname)
                .orElseThrow(ParticipantNotFoundException::new);
    }


    private boolean checkDuplicateNickname(Long roomId, String nickname) {
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname);
        if (participant.isEmpty()) {
            return false;
        } else {
            throw new DuplicateNicknameException();
        }
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private boolean matchPassword(String rawPassword, String encodePassword) {
        return passwordEncoder.matches(rawPassword, encodePassword);
    }

    private String convertDuration(Duration duration) {
        return String.format("%02d:%02d:%02d",
                duration.toHours(),
                duration.toMinutesPart(),
                duration.toSecondsPart()
        );
    }

}
