package org.a602.gotcha.domain.participant.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.exception.ParticipantNotFoundException;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.DuplicateNicknameRequest;
import org.a602.gotcha.domain.participant.request.ParticipantCheckRequest;
import org.a602.gotcha.domain.participant.request.ParticipantGameStartRequest;
import org.a602.gotcha.domain.participant.request.ProblemFinishRequest;
import org.a602.gotcha.domain.participant.response.ParticipantInfoResponse;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.participant.exception.ParticipantLoginFailedException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Transactional(readOnly = true)
    public Boolean duplicateNickname(DuplicateNicknameRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), request.getNickname());
        if (participant == null) {
            return false;
        } else {
            throw new DuplicateNicknameException();
        }
    }

    @Transactional
    public Participant registerUser(ParticipantCheckRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), request.getNickname());
        if (participant == null) {
            String hashPassword = bCryptPasswordEncoder.encode(request.getPassword());
            return participantRepository.save(
                    Participant.builder()
                            .nickname(request.getNickname())
                            .password(hashPassword)
                            .room(room)
                            .isFinished(false)
                            .build()
            );
        } else {
            throw new DuplicateNicknameException();
        }
    }

    @Transactional(readOnly = true)
    public ParticipantInfoResponse getUserInfo(ParticipantCheckRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), request.getNickname());
        if (participant == null) {
            throw new ParticipantNotFoundException();
        } else {
            if (bCryptPasswordEncoder.matches(request.getPassword(), participant.getPassword())) {
                return ParticipantInfoResponse.builder()
                        .isFinished(participant.getIsFinished())
                        .startTime(participant.getStartTime())
                        .build();
            } else throw new ParticipantLoginFailedException();
        }
    }

    @Transactional(readOnly = true)
    public void updateStartTime(ParticipantGameStartRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), request.getNickname());
        if (participant == null) {
            throw new ParticipantNotFoundException();
        } else {
            participant.updateStartTime(request.getStartTime());
        }
    }

    @Transactional(readOnly = true)
    public boolean checkUserValidation(Long roomId, String nickname) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), nickname);
        return !(participant == null);
    }

    @Transactional
    public void updateGameRecord(ProblemFinishRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Participant participant = participantRepository.findParticipantByRoomIdAndNickname(room.getId(), request.getNickname());
        if (participant == null) {
            throw new ParticipantNotFoundException();
        } else {
            // Duration 계산
            Duration duration = Duration.between(participant.getStartTime(), request.getEndTime());
            participant.registerRecord(request.getSolvedCnt(), request.getEndTime(), duration, true);
        }
    }
}
