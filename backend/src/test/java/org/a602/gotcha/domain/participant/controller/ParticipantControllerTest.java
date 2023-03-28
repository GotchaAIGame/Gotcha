package org.a602.gotcha.domain.participant.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.request.DuplicateNicknameRequest;
import org.a602.gotcha.domain.participant.request.ParticipantLoginRequest;
import org.a602.gotcha.domain.participant.request.ParticipantRegisterRequest;
import org.a602.gotcha.domain.participant.request.RankInfoRequest;
import org.a602.gotcha.domain.participant.response.ParticipantRankListResponse;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.global.common.BaseResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@CustomSpringBootTest
@Transactional
@AutoConfigureMockMvc
class ParticipantControllerTest {

    @Autowired
    EntityManager em;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    PasswordEncoder passwordEncoder;

    private Member member;
    private Long ROOM_ID_WITH_REWARD;
    private Long ROOM_ID_WITHOUT_REWARD;
    String url = "http://localhost:8080/api/game/";

    @BeforeEach
    void setUp() {
        // 유저(출제자) 생성
        member = Member.builder()
                .email("yezi@naver.com")
                .organization("naver").build();
        em.persist(member);
        // 방 생성
        Room roomA = Room.builder()
                .title("ssafy")
                .code(101101)
                .hasReward(true)
                .member(member)
                .startTime(LocalDateTime.now())
                .endTime((LocalDateTime.now().plusDays(7)))
                .build();
        em.persist(roomA);
        ROOM_ID_WITH_REWARD = roomA.getId();
        Room roomB = Room.builder()
                .title("a602")
                .code(102102)
                .hasReward(false)
                .member(member)
                .startTime(LocalDateTime.now())
                .endTime((LocalDateTime.now().plusDays(7)))
                .build();
        em.persist(roomB);
        ROOM_ID_WITHOUT_REWARD = roomB.getId();
        // 보상 생성
        for (int i = 1; i <= 3; i++) {
            Reward reward = Reward.builder()
                    .name("상품" + i)
                    .grade(i)
                    .room(roomA)
                    .build();
            em.persist(reward);
        }
        // 참여자 생성(게임완료)
        String HASH_PWD = passwordEncoder.encode("1234");
        LocalDateTime startTime = LocalDateTime.now().plusHours(1);
        for (int i = 10; i > 0; i--) {
            LocalDateTime endTime = LocalDateTime.now().plusHours(i + 1);
            Participant participant = Participant.builder()
                    .nickname("참여자" + i)
                    .password(HASH_PWD)
                    .startTime(startTime)
                    .endTime(endTime)
                    .duration(Duration.between(startTime, endTime))
                    .solvedCnt(i % 5)
                    .isFinished(true)
                    .room(roomA)
                    .build();
            em.persist(participant);
        }
        // 참여자 생성(게임완료)
        Participant participantA = Participant.builder()
                .nickname("YEZI")
                .password(HASH_PWD)
                .startTime(startTime)
                .endTime(startTime.plusDays(1))
                .duration(Duration.between(startTime, startTime.plusDays(1)))
                .solvedCnt(3)
                .isFinished(true)
                .room(roomA)
                .build();
        em.persist(participantA);
        // 참여자 생성(게임미완료)
        Participant participantB = Participant.builder()
                .nickname("TAEGYU")
                .password(HASH_PWD)
                .startTime(startTime)
                .solvedCnt(2)
                .isFinished(false)
                .room(roomA)
                .build();
        em.persist(participantB);
    }

    @Nested
    @DisplayName("참여자 닉네임 중복체크 API TEST")
    class DuplicateParticipantNickname {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .build();
            mockMvc
                    .perform(post(url + "duplicate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)));
        }

        @Test
        @DisplayName("중복된 아이디 있음")
        void duplicateNicknameExist() throws Exception {
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("YEZI")
                    .build();
            mockMvc
                    .perform(post(url + "duplicate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(400)));
        }

        @Test
        @DisplayName("중복체크 성공")
        void duplicateCheckSuccess() throws Exception {
            DuplicateNicknameRequest request = DuplicateNicknameRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("MINSU")
                    .build();
            mockMvc
                    .perform(post(url + "duplicate")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)))
                    .andExpect(jsonPath("$.result", is(false)));
        }

    }

    @Nested
    @DisplayName("참여자 신규 등록 API TEST")
    class RegisterParticipant {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(100000000L)
                    .nickname("MINSU")
                    .password("1234")
                    .build();
            mockMvc
                    .perform(post(url + "register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)));
        }

        @Test
        @DisplayName("중복된 아이디 있음")
        void duplicateNicknameExist() throws Exception {
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("YEZI")
                    .password("1234")
                    .build();
            mockMvc
                    .perform(post(url + "register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(400)));
        }

        @Test
        @DisplayName("참여자 등록 성공")
        void registerParticipantSuccess() throws Exception {
            ParticipantRegisterRequest request = ParticipantRegisterRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("MINSU")
                    .password("1234")
                    .build();
            mockMvc
                    .perform(post(url + "register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)));
        }

    }

    @Nested
    @DisplayName("기존 참여자 방에 로그인하기 API")
    class ParticipantLogin {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .password("1111")
                    .build();
            mockMvc
                    .perform(post(url + "login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("MINSU")
                    .password("1111")
                    .build();
            mockMvc
                    .perform(post(url + "login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("비밀번호가 일치하지 않음")
        void invalidPassword() throws Exception {
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("YEZI")
                    .password("1111")
                    .build();
            mockMvc
                    .perform(post(url + "login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(401)));
        }

        @Test
        @DisplayName("로그인 성공")
        void participantLoginSuccess() throws Exception {
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(ROOM_ID_WITH_REWARD)
                    .nickname("YEZI")
                    .password("1234")
                    .build();
            mockMvc
                    .perform(post(url + "login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)))
                    .andExpect(jsonPath("$.result.isFinished", is(true)));
        }
    }

    @Test
    @DisplayName("랭킹 확인하기")
    void getRank() throws Exception {
        RankInfoRequest request = RankInfoRequest.builder()
                .roomId(ROOM_ID_WITH_REWARD)
                .nickname("YEZI")
                .build();
        MockHttpServletResponse response = mockMvc.perform(post(url + "rank")
                        .content(objectMapper.writeValueAsBytes(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn()
                .getResponse();
        BaseResponse<List<ParticipantRankListResponse>> arrayList = objectMapper.readValue(response.getContentAsString(), BaseResponse.class);
        assertEquals(4, arrayList.getResult().size());
    }


}