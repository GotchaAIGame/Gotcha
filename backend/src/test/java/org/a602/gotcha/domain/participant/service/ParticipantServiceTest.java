package org.a602.gotcha.domain.participant.service;

import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.exception.ParticipantLoginFailedException;
import org.a602.gotcha.domain.participant.exception.ParticipantNotFoundException;
import org.a602.gotcha.domain.participant.repository.ParticipantQueryRepository;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.*;
import org.a602.gotcha.domain.participant.response.ParticipantInfoResponse;
import org.a602.gotcha.domain.participant.response.ParticipantRankListResponse;
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
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ParticipantServiceTest {

    @InjectMocks
    private ParticipantService participantService;
    @Mock
    private ParticipantRepository participantRepository;
    @Mock
    private ParticipantQueryRepository participantQueryRepository;
    @Mock
    private RoomRepository roomRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    Long ROOM_ID = 1L;
    Long INVALID_ROOM_ID = 10L;
    String USER_NICKNAME = "YEZI";
    String NOT_REGISTERED_NICKNAME = "TAEGYU";
    Integer USER_PASSWORD = 1234;
    String HASH_PASSWORD = "ENCODE_PASSWORD";
    Integer NOT_VALID_PASSWORD = 1111;

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
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
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
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(Participant.builder().build()));
            // then
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
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertFalse(participantService.existDuplicateNickname(request));
        }
    }

    @Nested
    @DisplayName("참여자 등록 메소드는")
    class RegisterParticipant {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.registerParticipant(request));
        }

        @Test
        @DisplayName("이미 해당 닉네임이 있을 경우 DuplicateNickname 예외 발생")
        void existDuplicatedNickname() {
            // given
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(Participant.builder().build()));
            // then
            assertThrows(DuplicateNicknameException.class, () -> participantService.registerParticipant(request));
        }

        @Test
        @DisplayName("존재하는 방에 해당 닉네임이 없을 경우 신규 유저로 등록")
        void registerSuccessfully() {
            // given
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            when(participantRepository.save(any())).thenReturn(Participant.builder()
                    .room(Room.builder().build())
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .password(HASH_PASSWORD)
                    .build());
            // then
            Participant participant = participantService.registerParticipant(request);
            assertEquals(NOT_REGISTERED_NICKNAME, participant.getNickname());
            assertEquals(HASH_PASSWORD, participant.getPassword());
        }
    }

    @Nested
    @DisplayName("참여자 정보가져오기 메소드는")
    class GetParticipantInfo {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.getParticipantInfo(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // given
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.getParticipantInfo(request));
        }

        @Test
        @DisplayName("참여자의 비밀번호가 일치하지 않을 경우 LoginFailed 예외 발생")
        void notValidPassword() {
            // given
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(NOT_VALID_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname()))
                    .thenReturn(Optional.of(Participant.builder()
                            .nickname(USER_NICKNAME)
                            .password(HASH_PASSWORD)
                            .build()));
            // then
            assertThrows(ParticipantLoginFailedException.class, () -> participantService.getParticipantInfo(request));
        }

        @Test
        @DisplayName("비밀번호 일치하면 참여자 정보 가져오기 성공")
        void getParticipantInfo() {
            // given
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(USER_PASSWORD)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname()))
                    .thenReturn(Optional.of(Participant.builder()
                            .nickname(USER_NICKNAME)
                            .password(HASH_PASSWORD)
                            .isFinished(false)
                            .build()));
            when(passwordEncoder.matches(USER_PASSWORD.toString(), HASH_PASSWORD)).thenReturn(true);
            // then
            ParticipantInfoResponse participantInfo = participantService.getParticipantInfo(request);
            assertFalse(participantInfo.getIsFinished());
        }
    }

    @Nested
    @DisplayName("updateStartTime 메소드는")
    class UpdateStartTime {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .startTime(LocalDateTime.of(2023, 3, 24, 9, 15, 30))
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.updateStartTime(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // given
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .startTime(LocalDateTime.of(2023, 3, 24, 9, 15, 30))
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.updateStartTime(request));
        }

        @Test
        @DisplayName("참여자 정보를 잘 불러왔으면 startTime 업데이트")
        void updateStartTime() {
            // given
            LocalDateTime updateTime = LocalDateTime.of(2023, 3, 24, 9, 15, 30);
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .startTime(updateTime)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(request.getRoomId(), request.getNickname()))
                    .thenReturn(Optional.of(Participant.builder()
                            .nickname(USER_NICKNAME)
                            .password(HASH_PASSWORD)
                            .isFinished(false)
                            .build()));
            // then
            assertTrue(participantService.updateStartTime(request));
        }

    }

    @Nested
    @DisplayName("checkUserValidation 메소드는")
    class CheckUserValidation {
        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {

            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.checkUserValidation(INVALID_ROOM_ID, USER_NICKNAME));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.checkUserValidation(ROOM_ID, NOT_REGISTERED_NICKNAME));
        }

        @Test
        @DisplayName("방에 해당 참여자가 있을 경우 TRUE 리턴")
        void checkUserValidation() {
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(Participant.builder().build()));
            // then
            assertTrue(participantService.checkUserValidation(ROOM_ID, USER_NICKNAME));
        }
    }

    @Nested
    @DisplayName("updateGameRecord 메소드는")
    class UpdateGameRecord {

        LocalDateTime startTime = LocalDateTime.of(2023, 3, 24, 9, 0, 30);
        LocalDateTime endTime = LocalDateTime.of(2023, 3, 24, 10, 3, 24);

        Room room = Room.builder().build();

        Participant participant = Participant.builder()
                .nickname(USER_NICKNAME)
                .password(HASH_PASSWORD)
                .room(room)
                .isFinished(false)
                .startTime(startTime)
                .build();

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .solvedCnt(4)
                    .endTime(endTime)
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.updateGameRecord(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // given
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .solvedCnt(4)
                    .endTime(endTime)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(room));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.updateGameRecord(request));
        }

        @Test
        @DisplayName("방에 해당 참여자가 있다면 기록 업데이트")
        void updateGameRecord() {
            // given
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .solvedCnt(4)
                    .endTime(endTime)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(room));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(participant));
            // then
            assertTrue(participantService.updateGameRecord(request));
        }
    }

    @Nested
    @DisplayName("updatePhoneNumber 메소드는")
    class UpdatePhoneNumber {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .phoneNumber("010-1111-1111")
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.updatePhoneNumber(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // given
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .phoneNumber("010-1111-1111")
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.updatePhoneNumber(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 있으면 휴대폰 번호 업데이트")
        void updatePhoneNumber() {
            // given
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .phoneNumber("010-1111-1111")
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(Participant.builder().build()));
            // then
            assertTrue(participantService.updatePhoneNumber(request));
        }

    }

    @Nested
    @DisplayName("getRankList 메소드는")
    class GetRankList {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFound 예외 발생")
        void notValidRoomId() {
            // given
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(INVALID_ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(INVALID_ROOM_ID)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> participantService.getRankList(request));
        }

        @Test
        @DisplayName("해당하는 참여자가 없을 경우 ParticipantNotFound 예외 발생")
        void notValidParticipant() {
            // given
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(NOT_REGISTERED_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, NOT_REGISTERED_NICKNAME))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ParticipantNotFoundException.class, () -> participantService.getRankList(request));
        }

        @Test
        @DisplayName("참여자가 Top3 안에 있을 경우 1~3위까지만 반환")
        void participantInTop3() {
            // given
            // 유저가 1등을 하도록 생성
            List<Participant> top3ParticipantList = new ArrayList<>();
            Participant participant = Participant.builder()
                    .nickname(USER_NICKNAME)
                    .duration(Duration.ofHours(1))
                    .solvedCnt(5)
                    .build();
            top3ParticipantList.add(participant);
            for (int i = 0; i < 2; i++) {
                top3ParticipantList.add(Participant.builder()
                        .nickname("temp" + i)
                        .duration(Duration.ofHours(2 + i))
                        .solvedCnt(4)
                        .build());
            }
            // 요청 정보 생성
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(participant));
            when(participantQueryRepository.getTop3Rank(ROOM_ID))
                    .thenReturn(top3ParticipantList);
            // then
            List<ParticipantRankListResponse> rankList = participantService.getRankList(request);
            assertEquals(3, rankList.size());
            assertTrue(rankList.get(0).getIsUser());
            assertFalse(rankList.get(1).getIsUser());
        }

        @Test
        @DisplayName("참여자가 총 2명일 때는 2명에 대한 정보만 반환")
        void existTwoParticipant() {
            // given
            List<Participant> top3ParticipantList = new ArrayList<>();
            Participant participant = Participant.builder()
                    .nickname(USER_NICKNAME)
                    .duration(Duration.ofHours(1))
                    .solvedCnt(5)
                    .build();
            top3ParticipantList.add(participant);
            for (int i = 0; i < 1; i++) {
                top3ParticipantList.add(Participant.builder()
                        .nickname("temp" + i)
                        .duration(Duration.ofHours(2 + i))
                        .solvedCnt(4)
                        .build());
            }
            // 요청 정보 생성
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(participant));
            when(participantQueryRepository.getTop3Rank(ROOM_ID))
                    .thenReturn(top3ParticipantList);
            // then
            List<ParticipantRankListResponse> rankList = participantService.getRankList(request);
            assertEquals(2, rankList.size());
            assertTrue(rankList.get(0).getIsUser());
            assertFalse(rankList.get(1).getIsUser());
        }

        @Test
        @DisplayName("참여자가 Top3 안에 없을 때는 Top3와 유저 정보 함께 반환")
        void participantOutOfRank() {
            // given
            List<Participant> top3ParticipantList = new ArrayList<>();
            for (int i = 0; i < 3; i++) {
                top3ParticipantList.add(Participant.builder()
                        .nickname("temp" + i)
                        .duration(Duration.ofHours(1 + i))
                        .solvedCnt(4)
                        .build());
            }
            Participant participant = Participant.builder()
                    .nickname(USER_NICKNAME)
                    .duration(Duration.ofHours(10))
                    .solvedCnt(5)
                    .build();
            // 요청 정보 생성
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .build();
            // when
            when(roomRepository.findById(ROOM_ID)).thenReturn(Optional.of(Room.builder().build()));
            when(participantRepository.findParticipantByRoomIdAndNickname(ROOM_ID, USER_NICKNAME))
                    .thenReturn(Optional.of(participant));
            when(participantQueryRepository.getTop3Rank(ROOM_ID))
                    .thenReturn(top3ParticipantList);
            when(participantQueryRepository.getParticipantRank(ROOM_ID, participant.getDuration(), participant.getSolvedCnt()))
                    .thenReturn(4L);
            // then
            List<ParticipantRankListResponse> rankList = participantService.getRankList(request);
            assertEquals(4, rankList.size());
            assertTrue(rankList.get(3).getIsUser());
            assertFalse(rankList.get(0).getIsUser());
        }

    }

}