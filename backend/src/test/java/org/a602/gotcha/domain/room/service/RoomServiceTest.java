package org.a602.gotcha.domain.room.service;

import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.response.EventDetailResponse;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RoomServiceTest {

    @InjectMocks
    private RoomService roomService;
    @Mock
    private RoomRepository roomRepository;
    @Mock
    private RewardRepository rewardRepository;

    int ROOM_CODE = 602602;
    int INVALID_ROOM_CODE = 111111;
    Long ROOM_ID = 1L;
    Long INVALID_ROOM_ID = 10L;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Nested
    @DisplayName("getRoomInfo 메소드는")
    class GetRoomInfo {

        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFoud 예외 발생")
        void notValidRoomId() {
            // when
            when(roomRepository.findByCode(INVALID_ROOM_CODE)).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> roomService.getRoomInfo(INVALID_ROOM_CODE));
        }

        @Test
        @DisplayName("방 유효기간이 끝났을 경우 RoomExpired 예외 발생")
        void expiredRoom() {
            // given
            LocalDateTime endTime = LocalDateTime.of(2022, 2, 24, 10, 0, 0);
            // when
            when(roomRepository.findByCode(ROOM_CODE)).thenReturn(Optional.of(Room.builder().endTime(endTime).build()));
            // then
            assertThrows(RoomExpiredException.class, () -> roomService.getRoomInfo(ROOM_CODE));
        }

        @Test
        @DisplayName("방이 유효할 경우 게임 정보 리턴")
        void getRoomInfo() {
            // given
            LocalDateTime endTime = LocalDateTime.now().plusDays(3);
            String color = "blue";
            String logoUrl = "url";
            String title = "title";
            // when
            when(roomRepository.findByCode(ROOM_CODE))
                    .thenReturn(Optional.of(Room.builder()
                            .color(color)
                            .logoUrl(logoUrl)
                            .title(title)
                            .endTime(endTime).build()));
            GameInfoResponse roomInfo = roomService.getRoomInfo(ROOM_CODE);
            // then
            assertEquals(color, roomInfo.getColor());
            assertEquals(logoUrl, roomInfo.getLogoUrl());
            assertEquals(title, roomInfo.getTitle());
        }

        Room room;


        @Nested
        @DisplayName("getNameRewardList 메소드는")
        class GetGameRewardList {

            @Test
            @DisplayName("방 정보가 없을 경우 RoomNotFoud 예외 발생")
            void notValidRoomId() {
                // when
                when(roomRepository.findById(eq(INVALID_ROOM_ID))).thenReturn(Optional.empty());
                // then
                assertThrows(RoomNotFoundException.class, () -> roomService.getGameRewardList(INVALID_ROOM_ID));
            }

            @Test
            @DisplayName("리워드 정보가 없을 경우 RewardNotFound 예외 발생")
            void rewardNotFounded() {
                // given
                List<Reward> emptyList = new ArrayList<>();
                // when
                when(roomRepository.findById(eq(ROOM_ID))).thenReturn(Optional.of(Room.builder().build()));
                when(rewardRepository.findRewardsByRoomId(ROOM_ID)).thenReturn(emptyList);
                // then
                assertThrows(RewardNotFoundException.class, () -> roomService.getGameRewardList(ROOM_ID));
            }

            @Test
            @DisplayName("리워드 정보가 있을 경우 정보 반환")
            void getReward() {
                // given
                List<Reward> rewardList = new ArrayList<>();
                for (int i = 0; i < 5; i++) {
                    rewardList.add(Reward.builder()
                            .grade(i)
                            .name("이름" + i)
                            .build());
                }
                // when
                when(roomRepository.findById(eq(ROOM_ID))).thenReturn(Optional.of(Room.builder().build()));
                when(rewardRepository.findRewardsByRoomId(ROOM_ID)).thenReturn(rewardList);
                List<RewardListResponse> gameRewardList = roomService.getGameRewardList(ROOM_ID);
                // then
                assertEquals(5, gameRewardList.size());
            }

        }

//        @Test
//        @DisplayName("방을 만들자")
//        void createRoomTest(@TempDir Path path) throws IOException {
//            Path resolve = path.resolve("image.jpg");
//            File file = resolve.toFile();
//            String str = "Hello world!";
//            try {
//                BufferedWriter writer = new BufferedWriter(new FileWriter(file));
//                writer.write(str);
//                writer.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            byte[] bytes = Files.readAllBytes(file.toPath());
//            String encode = Base64.getEncoder().encodeToString(bytes);
//            CreateRoomRequest request;
//            List<CreateProblemRequest> createProblemRequests = new ArrayList<>();
//            for (int i = 0; i < NUMS_OF_PROBLEM; i++) {
//                createProblemRequests.add(new CreateProblemRequest(encode, "name " + i, "description " + i, "hint " + i));
//            }
//
//            request = new CreateRoomRequest("색깔", "로고 경로", "제목", "이벤트 경로", "설명", false, LocalDateTime.now(), LocalDateTime.now(), createProblemRequests);
//            roomService.createRoom(request);
//
//            for (Problem problem : problemRepository.findAll()) {
//                s3Client.deleteObject(bucket, problem.getImageUrl());
//
//            }
//
//            assertEquals(NUMS_OF_PROBLEM, problemRepository.count());
//            assertEquals((long) NUMS_OF_PROBLEM * request.getProblems().size(), problemImageRepository.count());
//
//        }

    }
    @Nested
    @DisplayName("getEventDetail 메소드는")
    class GetEventDetail {
        @Test
        @DisplayName("방 정보가 없을 경우 RoomNotFoud 예외 발생")
        void notValidRoomId() {
            // when
            when(roomRepository.findById(eq(INVALID_ROOM_ID))).thenReturn(Optional.empty());
            // then
            assertThrows(RoomNotFoundException.class, () -> roomService.getEventDetail(INVALID_ROOM_ID));
        }

        @Test
        @DisplayName("방 정보가 유효하다면 이벤트 상세 내용 반환")
        void getEventDetail() {
            // given
            String EVENT_DESC = "이벤트 상세내용";
            String EVENT_URL = "이벤트 URL";
            Room gameRoom = Room.builder()
                    .eventDesc(EVENT_DESC)
                    .eventUrl(EVENT_URL)
                    .build();
            // when
            when(roomRepository.findById(eq(ROOM_ID))).thenReturn(Optional.of(gameRoom));
            // then
            EventDetailResponse result = roomService.getEventDetail(ROOM_ID);
            assertEquals(EVENT_DESC, result.getEventDesc());
            assertEquals(EVENT_URL, result.getEventUrl());
        }
    }

}