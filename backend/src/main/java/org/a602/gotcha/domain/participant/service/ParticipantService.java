package org.a602.gotcha.domain.participant.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.exception.ParticipantNotFoundException;
import org.a602.gotcha.domain.participant.exception.UpdateParticipantFailedException;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.*;
import org.a602.gotcha.domain.participant.response.ParticipantInfoResponse;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.participant.exception.ParticipantLoginFailedException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(readOnly = true)
    public Boolean existDuplicateNickname(DuplicateNicknameRequest request) {
        checkRoomValidation(request.getRoomId());
        return checkDuplicateNickname(request.getRoomId(), request.getNickname());
    }

    @Transactional
    public Participant registerParticipant(ParticipantRegisterRequest request) {
        Room room = checkRoomValidation(request.getRoomId());
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
        Participant participant = checkParticipantValidation(request.getRoomId(), request.getNickname());
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
        Participant participant = checkParticipantValidation(request.getRoomId(), request.getNickname());
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
        Participant participant = checkParticipantValidation(request.getRoomId(), request.getNickname());
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
        Participant participant = checkParticipantValidation(request.getRoomId(), request.getNickname());
        participant.updatePhoneNumber(request.getPhoneNumber());
        if (participant.getPhoneNumber().equals(request.getPhoneNumber())) {
            return true;
        } else {
            throw new UpdateParticipantFailedException();
        }
    }

    private Room checkRoomValidation(Long roomID) {
        return roomRepository.findById(roomID)
                .orElseThrow(RoomNotFoundException::new);
    }

    private Participant checkParticipantValidation(Long roomId, String nickname) {
        return participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname)
                .orElseThrow(ParticipantNotFoundException::new);
    }

    private boolean checkDuplicateNickname(Long roomId, String nickname) {
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname);
        if(participant.isEmpty()) {
            return false;
        } else {
            throw new DuplicateNicknameException();
        }
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    private boolean matchPassword(String rawPassword, String encodePassword) {
        return bCryptPasswordEncoder.matches(rawPassword, encodePassword);
    }


}
