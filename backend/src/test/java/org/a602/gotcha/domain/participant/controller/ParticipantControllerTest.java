package org.a602.gotcha.domain.participant.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.request.*;
import org.a602.gotcha.domain.participant.response.ParticipantRankListResponse;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
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

    private Long ROOM_ID;
    private Long ROOM_HAS_NO_PROBLEM_ID;
    private final Integer USER_PASSWORD = 1234;
    private final LocalDateTime GAME_START_TIME = LocalDateTime.now();
    private final LocalDateTime GAME_END_TIME = LocalDateTime.now().plusDays(7);
    private final LocalDateTime USER_GAME_START_TIME = LocalDateTime.now().plusHours(1);
    private final LocalDateTime USER_GAME_END_TIME = LocalDateTime.now().plusHours(2);
    private final int NUMBER_OF_PROBLEMS = 5;
    private final String url = "http://localhost:8080/api/game/";

    @BeforeEach
    void setUp() {
        // 유저(출제자) 생성
        Member member = Member.builder()
                .email("yezi@naver.com")
                .organization("naver").build();
        em.persist(member);
        // 방 생성
        Room room = Room.builder()
                .title("ssafy")
                .code(101101)
                .hasReward(true)
                .member(member)
                .startTime(GAME_START_TIME)
                .endTime(GAME_END_TIME)
                .build();
        em.persist(room);
        ROOM_ID = room.getId();
        // 문제 없는 방 생성
        Room roomB= Room.builder()
                .title("임시")
                .build();
        em.persist(roomB);
        ROOM_HAS_NO_PROBLEM_ID = roomB.getId();
        // 보상 생성
        for (int i = 1; i <= 3; i++) {
            Reward reward = Reward.builder()
                    .name("상품" + i)
                    .grade(i)
                    .room(room)
                    .build();
            em.persist(reward);
        }
        // 문제 생성
        for (int i = 1; i <= NUMBER_OF_PROBLEMS; i++) {
            Problem problem = Problem.builder()
                    .name("문제" + i)
                    .hint("힌트입니다.")
                    .imageUrl("url")
                    .room(room)
                    .build();
            em.persist(problem);
        }
        // 참여자 생성(게임완료)
        String HASH_PWD = passwordEncoder.encode(USER_PASSWORD.toString());
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
                    .room(room)
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
                .room(room)
                .build();
        em.persist(participantA);
        // 참여자 생성(게임미완료)
        Participant participantB = Participant.builder()
                .nickname("TAEGYU")
                .password(HASH_PWD)
                .startTime(startTime)
                .solvedCnt(2)
                .isFinished(false)
                .room(room)
                .build();
        em.persist(participantB);
        // 참여자 생성(가입만 완료)
        Participant participantC = Participant.builder()
                .nickname("DASOM")
                .password(HASH_PWD)
                .isFinished(false)
                .room(room)
                .build();
        em.persist(participantC);
        // 참여자 생성(문제 없는 방)
        Participant participantTemp = Participant.builder()
                .nickname("YEZI")
                .password(HASH_PWD)
                .startTime(startTime)
                .endTime(startTime.plusDays(1))
                .duration(Duration.between(startTime, startTime.plusDays(1)))
                .solvedCnt(3)
                .isFinished(true)
                .room(roomB)
                .build();
        em.persist(participantTemp);
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
                    .roomId(ROOM_ID)
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
                    .roomId(ROOM_ID)
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
                    .password(USER_PASSWORD)
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
                    .roomId(ROOM_ID)
                    .nickname("YEZI")
                    .password(USER_PASSWORD)
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
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .password(USER_PASSWORD)
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
    @DisplayName("기존 참여자 방에 로그인하기 API TEST")
    class ParticipantLogin {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            ParticipantLoginRequest request = ParticipantLoginRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .password(1111)
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
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .password(1111)
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
                    .roomId(ROOM_ID)
                    .nickname("YEZI")
                    .password(1111)
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
                    .roomId(ROOM_ID)
                    .nickname("YEZI")
                    .password(USER_PASSWORD)
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

    @Nested
    @DisplayName("게임 신규로 시작하기 API TEST")
    class NewGameStart {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .startTime(USER_GAME_START_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "start")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .startTime(USER_GAME_START_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "start")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("해당하는 문제 없음")
        void problemNotFounded() throws Exception {
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(ROOM_HAS_NO_PROBLEM_ID)
                    .nickname("YEZI")
                    .startTime(USER_GAME_START_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "start")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("PR100")));
        }

        @Test
        @DisplayName("게임 시작하기 성공")
        void newGameStartSuccess() throws Exception {
            ParticipantGameStartRequest request = ParticipantGameStartRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("DASOM")
                    .startTime(USER_GAME_START_TIME)
                    .build();
            MockHttpServletResponse response = mockMvc
                    .perform(post(url + "start")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)))
                    .andReturn()
                    .getResponse();
            BaseResponse<List<ProblemListResponse>> problemList = objectMapper.readValue(response.getContentAsString(), BaseResponse.class);
            assertEquals(NUMBER_OF_PROBLEMS, problemList.getResult().size());
        }
    }

    @Nested
    @DisplayName("게임 재참여하기 API TEST")
    class RejoinGame {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            RejoinGameRequest request = RejoinGameRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .build();
            mockMvc
                    .perform(post(url + "rejoin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            RejoinGameRequest request = RejoinGameRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .build();
            mockMvc
                    .perform(post(url + "rejoin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("해당하는 문제 없음")
        void problemNotFounded() throws Exception {
            RejoinGameRequest request = RejoinGameRequest.builder()
                    .roomId(ROOM_HAS_NO_PROBLEM_ID)
                    .nickname("YEZI")
                    .build();
            mockMvc
                    .perform(post(url + "rejoin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("PR100")));
        }

        @Test
        @DisplayName("게임 신규 시작 성공")
        void gameRestartSuccess() throws Exception {
            RejoinGameRequest request = RejoinGameRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("TAEGYU")
                    .build();
            MockHttpServletResponse response = mockMvc
                    .perform(post(url + "rejoin")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)))
                    .andReturn()
                    .getResponse();
            BaseResponse<List<ProblemListResponse>> problemList = objectMapper.readValue(response.getContentAsString(), BaseResponse.class);
            assertEquals(NUMBER_OF_PROBLEMS, problemList.getResult().size());
        }


    }

    @Nested
    @DisplayName("최종 제출 기록 등록하기 API TEST")
    class RegisterGameRecord {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .solvedCnt(3)
                    .endTime(USER_GAME_END_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "clear")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .solvedCnt(3)
                    .endTime(USER_GAME_END_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "clear")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("유저 기록 등록 성공")
        void registerRecordSuccess() throws Exception {
            ProblemFinishRequest request = ProblemFinishRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("TAEGYU")
                    .solvedCnt(3)
                    .endTime(USER_GAME_END_TIME)
                    .build();
            mockMvc
                    .perform(post(url + "clear")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)));
        }

    }

    @Nested
    @DisplayName("휴대폰 번호 입력하기 API TEST")
    class RegisterPhoneNumber {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .phoneNumber("010-1111-1111")
                    .build();
            mockMvc
                    .perform(post(url + "phonenumber")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .phoneNumber("010-1111-1111")
                    .build();
            mockMvc
                    .perform(post(url + "phonenumber")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("올바르지 않은 휴대폰 번호 형식")
        void invalidPhoneNumber() throws Exception {
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("YEZI")
                    .phoneNumber("01011111111")
                    .build();
            mockMvc
                    .perform(post(url + "phonenumber")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(400)))
                    .andExpect(jsonPath("$.code", is("P300")));
        }

        @Test
        @DisplayName("휴대폰 번호 업데이트 성공")
        void updatePhoneNumberSuccess() throws Exception {
            RegisterPhonenumberRequest request = RegisterPhonenumberRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("YEZI")
                    .phoneNumber("010-1111-1111")
                    .build();
            mockMvc
                    .perform(post(url + "phonenumber")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(200)));
        }

    }

    @Nested
    @DisplayName("랭킹 확인하기 API TEST")
    class GetRankList {

        @Test
        @DisplayName("해당하는 방 없음")
        void invalidRoom() throws Exception {
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(100000000L)
                    .nickname("YEZI")
                    .build();
            mockMvc
                    .perform(post(url + "rank")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("R100")));
        }

        @Test
        @DisplayName("해당 유저를 찾을 수 없음")
        void invalidParticipant() throws Exception {
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("MINSU")
                    .build();
            mockMvc
                    .perform(post(url + "rank")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(request))
                    )
                    .andExpect(jsonPath("$.status", is(404)))
                    .andExpect(jsonPath("$.code", is("P200")));
        }

        @Test
        @DisplayName("랭킹 목록 불러오기 성공")
        void getRank() throws Exception {
            RankInfoRequest request = RankInfoRequest.builder()
                    .roomId(ROOM_ID)
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
}