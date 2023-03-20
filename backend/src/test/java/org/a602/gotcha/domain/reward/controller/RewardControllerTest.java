package org.a602.gotcha.domain.reward.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.domain.reward.Reward;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
import org.a602.gotcha.domain.reward.service.RewardService;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.global.common.S3Service;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
class RewardControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RewardRepository rewardRepository;

    @Autowired
    RewardService rewardService;

    @Autowired
    EntityManager entityManager;

    @Mock
    S3Service s3Service;

    String url = "http://localhost:8080/api";
    Room room;
    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        room = new Room();
        entityManager.persist(room);
        Reward reward1 = new Reward("리워드 1", 3, room, null);
        Reward reward2 = new Reward("리워드 2", 4, room, null);
        entityManager.persist(reward1);
        entityManager.persist(reward2);


    }

    @Test
    @DisplayName("리워드 저장 테스트")
    void setReward() throws Exception {

        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                new SetRewardRequest.RewardDTO("리워드 이름1", 1, null),
                new SetRewardRequest.RewardDTO("리워드 이름2", 2, null)),
                room.getId());
        String content = objectMapper.writeValueAsString(setRewardRequest);
        mockMvc.perform(post(url + "/set/reward")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON));

        Assertions.assertEquals(3, rewardRepository.count());

    }

    @Test
    @DisplayName("리워드 수정 테스트")
    void updateReward() throws Exception {
//        when(s3Service.uploadImage(anyString())).thenAnswer(invocation -> invocation.getArgument(0));


        List<Reward> beforeUpdate = rewardRepository.findByRoomId(room.getId());
        List<UpdateRewardDTO> updateRewardDTOList = new ArrayList<>();
        int index = 0;
        for (Reward reward : beforeUpdate) {
            updateRewardDTOList.add(
                    new UpdateRewardDTO(reward.getId(), "리워드 업데이트 " + index, index + 1, null)
            );
            index += 1;
        }

        UpdateRewardRequest updateRewardRequest = new UpdateRewardRequest(updateRewardDTOList, room.getId());
        mockMvc.perform(put(url + "/set/reward")
                .content(objectMapper.writeValueAsString(updateRewardRequest))
                .contentType(MediaType.APPLICATION_JSON));

        entityManager.flush();
        entityManager.clear();
        index = 0;
        List<Reward> afterUpdate = rewardRepository.findByRoomId(room.getId());
        for (Reward reward : afterUpdate) {
            int finalIndex = index;
            Assertions.assertAll(
                    () -> Assertions.assertEquals("리워드 업데이트 " + finalIndex, reward.getName()),
                    () -> Assertions.assertEquals(finalIndex + 1, reward.getGrade())
            );
            index += 1;
        }
    }


}