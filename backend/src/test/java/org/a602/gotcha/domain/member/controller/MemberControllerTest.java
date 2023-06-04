package org.a602.gotcha.domain.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.EntityManager;

import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.service.MemberService;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.is;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@CustomSpringBootTest
@Transactional
@AutoConfigureMockMvc
public class MemberControllerTest {
    @Autowired
    EntityManager entityManager;
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @MockBean
    MemberService memberService;
    private String token;
    private final String url = "http://localhost:8080/api/member";

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .email("alkwen0996@naver.com")
                .nickname("이민수")
                .registrationId("kakao")
                .build();
        entityManager.persist(member);
        token = JwtTokenProvider.BEARER + jwtTokenProvider.createAccessToken(member);
    }

    @Test
    @DisplayName("회원가입 API 테스트 성공")
    void signupMemberApiTest() throws Exception {
        final MemberSignupRequest request = MemberSignupRequest.builder()
                .organization("ssafy")
                .password("1234")
                .nickname("minsu2")
                .email("minsu2@naver.com")
                .build();

        mockMvc.perform(post(url + "/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(request)))
                .andExpect(jsonPath("$.status", is(200)));
    }

    @Test
    @DisplayName("닉네임 중복확인 API 테스트 성공")
    void duplicateNickNameApiTest() throws Exception {
        String nickname = "minsu";

        mockMvc.perform(get(url + "/duplicateNickname").param("nickname", nickname))
                .andExpect(jsonPath("$.status", is(200)))
                .andExpect(jsonPath("$.result", is(false)));
    }

    @Test
    @DisplayName("이메일 중복확인 API 테스트 성공")
    void duplicateEmailApiTest() throws Exception {
        String email = "minsu@naver.com";

        mockMvc.perform(get(url + "/duplicateEmail").param("email", email))
                .andExpect(jsonPath("$.status", is(200)))
                .andExpect(jsonPath("$.result", is(false)));
    }

    @Test
    @DisplayName("로그인 성공")
    void loginSuccess() throws Exception {
        final MemberLoginRequest memberLoginRequest = MemberLoginRequest.of(
                "minsu@naver.com",
                "1234"
        );

        mockMvc
                .perform(post(url + "/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(memberLoginRequest))
                ).andExpect(jsonPath("$.status", is(200)));
    }

    @Test
    @DisplayName("회원정보 조회 API 테스트 성공")
    void findMemberApiTest() throws Exception {
        final String id = "1";

        mockMvc.perform(get(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(AUTHORIZATION, token)
                        .param("id", id))
                .andExpect(jsonPath("$.status", is(200)));
    }

}
