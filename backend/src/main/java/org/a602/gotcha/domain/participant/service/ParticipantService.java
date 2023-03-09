package org.a602.gotcha.domain.participant.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.repository.ParticipantQueryRepository;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.ParticipantCheckRequest;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ParticipantService {

    private final ParticipantQueryRepository participantQueryRepository;
    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public Participant registerUser(ParticipantCheckRequest request) {

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(RoomNotFoundException::new);
        List<Participant> participants = participantQueryRepository.searchByRoomAndNickname(room, request.getNickname());
        if(participants.size() == 0) {
            return participantRepository.save(
                    Participant.builder()
                            .nickname(request.getNickname())
                            .password(request.getPassword())
                            .room(room)
                            .build()
            );
        } else {
            throw new DuplicateNicknameException();
        }
    }
}
