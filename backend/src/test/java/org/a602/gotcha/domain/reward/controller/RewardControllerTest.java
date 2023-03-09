package org.a602.gotcha.domain.reward.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
import org.a602.gotcha.domain.reward.service.RewardService;
import org.a602.gotcha.domain.room.Room;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class RewardControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RewardRepository rewardRepository;

    @Autowired
    RewardService rewardService;

    @Autowired
    EntityManager entityManager;

    String url = "http://localhost:8080/";
    Room room;
    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        room = new Room();
        entityManager.persist(room);


    }

    @Test
    @DisplayName("리워드 저장 테스트")
    void setReward() throws Exception {
        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                new SetRewardRequest.RewardDTO("이름1", 1),
                new SetRewardRequest.RewardDTO("리워드 이름2", 2)),
                room.getId());
        String content = objectMapper.writeValueAsString(setRewardRequest);
        mockMvc.perform(post(url + "api/set/reward")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));

        Assertions.assertEquals(2, rewardRepository.count());


    }

}