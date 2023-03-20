package org.a602.gotcha.domain.reward.service;

import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest
@Transactional
@ExtendWith(MockitoExtension.class)
class RewardServiceTest {
    @Autowired
    RewardRepository rewardRepository;

    @Autowired
    RewardService rewardService;

    @Autowired
    EntityManager entityManager;

    Room room;


    @Mock
    S3Service s3Service;

    @BeforeEach
    void setUp() {
        room = new Room();
        entityManager.persist(room);
        when(s3Service.uploadImage(anyString())).thenAnswer(invocation -> invocation.getArgument(0));

    }

    @Test
    @DisplayName("리워드 저장 테스트")
    void setReward() {
        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                new SetRewardRequest.RewardDTO("이름1", 1, null),
                new SetRewardRequest.RewardDTO("리워드 이름2", 2, null)),
                room.getId());
        rewardService.setReward(setRewardRequest.getRewards(), setRewardRequest.getRoomId());
        Assertions.assertEquals(2, rewardRepository.count());
    }
}