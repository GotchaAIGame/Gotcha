package org.a602.gotcha.domain.problem.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

import javax.persistence.EntityManager;

import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.request.DeleteProblemRequest;
import org.a602.gotcha.domain.problem.request.UpdateProblemRequest;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

@CustomSpringBootTest
@Transactional
@AutoConfigureMockMvc
class ProblemControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    EntityManager em;

    @Autowired
    ProblemRepository problemRepository;

    String url = "http://localhlst:8080/api";

    @Autowired
    ObjectMapper objectMapper;
    Room room;
    Problem problem;
    String base64Image;
    UpdateProblemRequest updateProblemRequest;
    Member member;
    String token;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @BeforeEach
    void setup(@TempDir Path path) throws IOException {
        room = Room.builder()
                .color("색")
                .logoUrl("로고")
                .title("제목")
                .eventDesc("이벤트 url")
                .eventDesc("이벤트 설명")
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now().plus(10, ChronoUnit.MINUTES))
                .hasReward(true).build();
        em.persist(this.room);

        Path resolve = path.resolve("image.jpg");
        File file = resolve.toFile();
        String str = "Hello world!";
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(file));
            writer.write(str);
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] bytes = Files.readAllBytes(file.toPath());
        base64Image = Base64.getEncoder().encodeToString(bytes);
        problem = new Problem("이름", "힌트", base64Image, this.room);
        em.persist(problem);

        updateProblemRequest = new UpdateProblemRequest(base64Image, "업데이트 이름", "업데이트 힌트", problem.getId());
        member = Member.builder()
                .email("suker80@naver.com")
                .organization("삼성").build();
        token = JwtTokenProvider.BEARER + " " + jwtTokenProvider.createAccessToken(member);
        em.persist(member);
        em.flush();
        em.clear();
    }

    @Test
    @DisplayName("문제 업데이트 API 테스트")
    void updateProblem() throws Exception {
        UpdateProblemRequest updateProblemRequest = new UpdateProblemRequest(null, "업데이트 이름", "업데이트 힌트", problem.getId());

        mvc.perform(put(url + "/set/problem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, token)
                        .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                .andExpect(status().isOk());
        em.flush();
        em.clear();
        Problem updateProblem = problemRepository.findById(problem.getId()).orElseThrow();

        Assertions.assertEquals("업데이트 이름", updateProblem.getName());
        Assertions.assertEquals("업데이트 힌트", updateProblem.getHint());
    }

    @Nested
    @DisplayName("API 유효성 검사 ")
    class NestedTest {


        @Test
        @DisplayName("이름이 null일 경우")
        void nameNull() throws Exception {
            em.flush();
            em.clear();
            updateProblemRequest.setName(null);
            mvc.perform(put(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("힌트가 null 일 경우")
        void hintNull() throws Exception {
            updateProblemRequest.setHint(null);
            em.flush();
            em.clear();
            mvc.perform(put(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON).header(HttpHeaders.AUTHORIZATION, token)
                            .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                    .andExpect(status().isBadRequest());
        }
    }


    @Nested
    @DisplayName("문제 삭제 api")
    class ProblemRemoveTest {

        @Test
        @DisplayName("정상 요청 일때")
        void normalCase() throws Exception {
            DeleteProblemRequest problemRequest = new DeleteProblemRequest(problem.getId());

            mvc.perform(delete(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .content(objectMapper.writeValueAsBytes(problemRequest)))
                    .andExpect(status().isOk());


            Assertions.assertTrue(problemRepository.findById(problem.getId()).isEmpty());

        }


        @Test
        @DisplayName("문제 id가 음수 요청 일때")
        void problemIdNotPositive() throws Exception {
            DeleteProblemRequest problemRequest = new DeleteProblemRequest(-problem.getId());

            mvc.perform(delete(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .content(objectMapper.writeValueAsBytes(problemRequest)))
                    .andExpect(status().isBadRequest());


            Assertions.assertTrue(problemRepository.findById(problem.getId()).isPresent());

        }

        @Test
        @DisplayName("문제 id가 null 일때")
        void problemIdIsNull() throws Exception {
            DeleteProblemRequest problemRequest = new DeleteProblemRequest(null);

            mvc.perform(delete(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .content(objectMapper.writeValueAsBytes(problemRequest)))
                    .andExpect(status().isBadRequest());


            Assertions.assertTrue(problemRepository.findById(problem.getId()).isPresent());

        }

    }
}