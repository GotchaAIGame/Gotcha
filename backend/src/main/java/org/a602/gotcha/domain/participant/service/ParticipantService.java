package org.a602.gotcha.domain.participant.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.exception.ParticipantNotFoundException;
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
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Transactional(readOnly = true)
    public Boolean existDuplicateNickname(DuplicateNicknameRequest request) {
        roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            return false;
        } else {
            throw new DuplicateNicknameException();
        }
    }

    @Transactional
    public Participant registerParticipant (ParticipantRegisterRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            final String hashPassword = encodePassword(request.getPassword());
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
    public ParticipantInfoResponse getParticipantInfo(ParticipantLoginRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            throw new ParticipantNotFoundException();
        } else {
            if (matchPassword(request.getPassword(), participant.get().getPassword())) {
                return ParticipantInfoResponse.builder()
                        .isFinished(participant.get().getIsFinished())
                        .startTime(participant.get().getStartTime())
                        .build();
            } else throw new ParticipantLoginFailedException();
        }
    }

    @Transactional
    public void updateStartTime(ParticipantGameStartRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            throw new ParticipantNotFoundException();
        } else {
            participant.get().updateStartTime(request.getStartTime());
        }
    }

    @Transactional(readOnly = true)
    public boolean checkUserValidation(Long roomId, String nickname) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(roomId, nickname);
        return !(participant.isEmpty());
    }

    @Transactional
    public void updateGameRecord(ProblemFinishRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            throw new ParticipantNotFoundException();
        } else {
            // Duration 계산
            Duration duration = Duration.between(participant.get().getStartTime(), request.getEndTime());
            participant.get().registerRecord(request.getSolvedCnt(), request.getEndTime(), duration, true);
        }
    }

    @Transactional
    public void updatePhoneNumber(RegisterPhonenumberRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        Optional<Participant> participant = participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname());
        if (participant.isEmpty()) {
            throw new ParticipantNotFoundException();
        } else {
            participant.get().updatePhoneNumber(request.getPhoneNumber());
        }
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    private boolean matchPassword(String rawPassword, String encodePassword) {
        return bCryptPasswordEncoder.matches(rawPassword, encodePassword);
    }



}
