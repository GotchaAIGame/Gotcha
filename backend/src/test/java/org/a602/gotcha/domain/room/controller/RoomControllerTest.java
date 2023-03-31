package org.a602.gotcha.domain.room.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.request.UpdateRoomRequest;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@CustomSpringBootTest
@Transactional
@AutoConfigureMockMvc
class RoomControllerTest {

    @Autowired
    EntityManager em;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    private final String url = "http://localhost:8080/api/";
    private Room room;
    private Long ROOM_ID_WITH_REWARD;
    private Long ROOM_ID_WITHOUT_REWARD;
    private final LocalDateTime GAME_START_TIME = LocalDateTime.now();
    private final LocalDateTime GAME_END_TIME = LocalDateTime.now().plusDays(7);
    private String token;
    private Member member;

    @BeforeEach
    void setUp() {
        // 유저(출제자) 생성
        member = Member.builder()
                .email("suker80@naver.com")
                .organization("삼성").build();
        token = JwtTokenProvider.BEARER + " " + jwtTokenProvider.createAccessToken(member);
        em.persist(member);
        // 방 생성(리워드 있음)
        room = Room.builder()
                .color("blue")
                .logoUrl("logoURL")
                .title("제목")
                .eventUrl("eventURL")
                .code(123412)
                .eventDesc("이벤트내용")
                .hasReward(true)
                .startTime(GAME_START_TIME)
                .endTime(GAME_END_TIME)
                .member(member)
                .build();
        // 리워드 생성
        for (int i = 1; i <= 3; i++) {
            Reward reward = Reward.builder()
                    .name("상품" + i)
                    .grade(i)
                    .room(room)
                    .build();
            em.persist(reward);
            room.getRewards().add(reward);
        }
        em.persist(room);
        ROOM_ID_WITH_REWARD = room.getId();
        // 방 생성(리워드 없음)
        Room roomB = Room.builder()
                .color("blue")
                .logoUrl("logoURL")
                .title("제목")
                .eventUrl("eventURL")
                .code(666666)
                .eventDesc("이벤트내용")
                .hasReward(false)
                .startTime(GAME_START_TIME)
                .endTime(GAME_END_TIME)
                .member(member)
                .build();
        em.persist(roomB);
        ROOM_ID_WITHOUT_REWARD = roomB.getId();
    }

    @Nested
    @DisplayName("코드로 게임 접속하기 API TEST")
    class EnterRoom {

        @Test
        @DisplayName("해당 방 정보 찾을 수 없음")
        void invalidRoomCode() throws Exception {
            mockMvc
                    .perform(get(url + "game/enter")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomCode", String.valueOf(444444)))
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 방에 접근할 수 없음(유효기간 만료)")
        void expiredRoomCode() throws Exception {
            // 유효하지 않은 방 생성
            Room room = Room.builder()
                    .code(444444)
                    .endTime(LocalDateTime.now().minusDays(2))
                    .build();
            em.persist(room);
            mockMvc
                    .perform(get(url + "game/enter")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomCode", String.valueOf(444444)))
                    .andExpect(jsonPath("$.status", is(403)))
                    .andExpect(jsonPath("$.code", is("R200")));
        }

        @Test
        @DisplayName("방 입장 성공")
        void enterRoomSuccess() throws Exception {
            mockMvc
                    .perform(get(url + "game/enter")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomCode", String.valueOf(123412)))
                    .andExpect(jsonPath("$.status", is(200)));
        }
    }

    @Nested
    @DisplayName("우승 상품 확인하기 API TEST")
    class GetGameRewardList {

        @Test
        @DisplayName("해당 방 정보 찾을 수 없음")
        void invalidRoomCode() throws Exception {
            mockMvc
                    .perform(get(url + "game/reward")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomId", String.valueOf(100000000)))
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("우승 상품 없음")
        void noReward() throws Exception {
            mockMvc
                    .perform(get(url + "game/reward")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomId", String.valueOf(ROOM_ID_WITHOUT_REWARD)))
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("RW100")));
        }

        @Test
        @DisplayName("우승 상품 불러오기 성공")
        void getRewardListSuccess() throws Exception {
            MockHttpServletResponse response = mockMvc
                    .perform(get(url + "game/reward")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomId", String.valueOf(ROOM_ID_WITH_REWARD)))
                    .andExpect(jsonPath("$.status", is(200)))
                    .andReturn()
                    .getResponse();
            BaseResponse<List<RewardListResponse>> problemList = objectMapper.readValue(response.getContentAsString(), BaseResponse.class);
            assertEquals(3, problemList.getResult().size());
        }
    }

    @Nested
    @DisplayName("이벤트 상세 내용 확인 API TEST")
    class GetEventDetail {

        @Test
        @DisplayName("해당 방 정보 찾을 수 없음")
        void invalidRoomCode() throws Exception {
            mockMvc
                    .perform(get(url + "game/detail")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomId", String.valueOf(100000000)))
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("이벤트 내용 불러오기 성공")
        void getEventDetailSuccess() throws Exception {
            mockMvc
                    .perform(get(url + "game/detail")
                            .contentType(MediaType.APPLICATION_JSON)
                            .param("roomId", String.valueOf(ROOM_ID_WITH_REWARD)))
                    .andExpect(jsonPath("$.status", is(200)));
        }

    }

    @Test
    @DisplayName("새로운 게임룸 생성하기 성공")
    void updateRoom() throws Exception {
        UpdateRoomRequest updateRoomRequest = new UpdateRoomRequest(
                room.getId(),
                "변경색깔",
                "변경로고",
                "변경제목",
                "변경이벤트",
                "변경내용",
                LocalDateTime.of(2023, 3, 17, 12, 0, 0),
                LocalDateTime.of(2023, 3, 17, 12, 5, 0)
        );

        mockMvc.perform(put(url + "set/room")
                .content(objectMapper.writeValueAsBytes(updateRoomRequest))
                .header(HttpHeaders.AUTHORIZATION, token)
                .contentType(MediaType.APPLICATION_JSON));

        em.flush();
        em.clear();
        Room updateRoom = em.find(Room.class, room.getId());
        assertEquals("변경이벤트", updateRoom.getEventUrl());
        assertEquals("변경색깔", updateRoom.getColor());
        assertEquals("변경로고", updateRoom.getLogoUrl());
        assertEquals("변경이벤트", updateRoom.getEventUrl());
        assertEquals("변경내용", updateRoom.getEventDesc());
        assertEquals(LocalDateTime.of(2023, 3, 17, 12, 0, 0), updateRoom.getStartTime());
        assertEquals(LocalDateTime.of(2023, 3, 17, 12, 5, 0), updateRoom.getEndTime());
    }

    @Test
    @DisplayName("룸 조회")
    void roomDetail() throws Exception {
        mockMvc.perform(get(url + "/room/{roomId}", room.getId())
                .header(HttpHeaders.AUTHORIZATION, token)).andExpect(status().isOk());

    }

    @Test
    @DisplayName("멤버로 방 조회")
    void findByMember() throws Exception {
        mockMvc.perform(
                get(url + "member/room/{memberId}", member.getId())
                        .header(HttpHeaders.AUTHORIZATION, token)
        ).andDo(print());
    }
}