package org.a602.gotcha.domain.room.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.response.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoomService {
    
    private final RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public Long findRoom(String roomCode) {
        Room gameRoom = Optional.ofNullable(roomRepository.findByCode(roomCode))
                .orElseThrow(RoomNotFoundException::new);
        return gameRoom.getId();
    }

}
