package org.a602.gotcha.domain.problem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.domain.problem.Problem;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.request.DeleteProblemRequest;
import org.a602.gotcha.domain.problem.request.UpdateProblemRequest;
import org.a602.gotcha.domain.room.Room;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
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


    @BeforeEach
    void setup(@TempDir Path path) throws IOException {
        room = new Room("색", "로고", "제목", "이벤트 ", "설명", LocalDateTime.now(), LocalDateTime.now().plus(10, ChronoUnit.MINUTES), 1212);
        em.persist(room);

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
        problem = new Problem("이름", "설명", "힌트", room, base64Image);
        em.persist(problem);

        updateProblemRequest = new UpdateProblemRequest(base64Image, "업데이트 이름", " 업데이트 설명", "업데이트 힌트", problem.getId());
        em.flush();
        em.clear();
    }

    @Test
    @DisplayName("문제 업데이트 API 테스트")
    void updateProblem() throws Exception {
        UpdateProblemRequest updateProblemRequest = new UpdateProblemRequest(base64Image, "업데이트 이름", "업데이트 설명", "업데이트 힌트", problem.getId());

        mvc.perform(put(url + "/set/problem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                .andExpect(status().isOk());
        em.flush();
        em.clear();
        Problem updateProblem = problemRepository.findById(problem.getId()).orElseThrow();

        Assertions.assertEquals("업데이트 이름", updateProblem.getName());
        Assertions.assertEquals("업데이트 설명", updateProblem.getDescription());
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
                            .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("설명이 null일 경우")
        void desNull() throws Exception {
            updateProblemRequest.setDescription(null);
            em.flush();
            em.clear();
            mvc.perform(put(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsBytes(updateProblemRequest)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("설명이 힌트가 null 일 경우")
        void hintNull() throws Exception {
            updateProblemRequest.setHint(null);
            em.flush();
            em.clear();
            mvc.perform(put(url + "/set/problem")
                            .contentType(MediaType.APPLICATION_JSON)
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
                            .content(objectMapper.writeValueAsBytes(problemRequest)))
                    .andExpect(status().isBadRequest());


            Assertions.assertTrue(problemRepository.findById(problem.getId()).isPresent());

        }

    }
}