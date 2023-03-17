package org.a602.gotcha.domain.participant.service;

import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.DuplicateNicknameRequest;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ParticipantServiceTest {

    @InjectMocks
    private ParticipantService participantService;

    @Mock
    private ParticipantRepository participantRepository;
    @Mock
    private RoomRepository roomRepository;

    Long ROOM_ID = 1L;
    Long INVALID_ROOM_ID = 10L;
    String USER_NICKNAME = "YEZI";
    String NOT_REGISTERED_NICKNAME = "TAEGYU";

    @Nested
    @DisplayName("참여자 닉네임 중복 체크 메소드는")
    class DuplicateCheck {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFoud 예외 발생")
        void notValidRoomId() {
            // given
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(eq(INVALID_ROOM_ID))).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.existDuplicateNickname(request));
        }

        @Test
        @DisplayName("해당하는 방에 이미 동일 닉네임이 있다면 DuplicateNickname 예외 발생")
        void existDuplicatedNickname() {
            // given
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .build();
            //when
            when(roomRepository.findById(any(Long.class))).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(Participant.builder().build()));
            assertThrows(DuplicateNicknameException.class, () -> participantService.existDuplicateNickname(request));
        }

        @Test
        @DisplayName("해당하는 방에 동일 닉네임이 없다면 false 값 반환")
        void passDuplicateNickname() {
            // given
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .build();
            //when
            when(roomRepository.findById(any(Long.class))).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            assertFalse(participantService.existDuplicateNickname(request));
        }

    }


}