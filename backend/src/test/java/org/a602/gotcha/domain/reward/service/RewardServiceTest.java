package org.a602.gotcha.domain.reward.service;

import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
import org.a602.gotcha.domain.room.Room;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@SpringBootTest
@Transactional
class RewardServiceTest {
    @Autowired
    RewardRepository rewardRepository;

    @Autowired
    RewardService rewardService;

    @Autowired
    EntityManager entityManager;

    Room room;

    @BeforeEach
    void setUp() {
        room = new Room();
        entityManager.persist(room);

    }

    @Test
    @DisplayName("리워드 저장 테스트")
    void setReward() {
        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                new SetRewardRequest.RewardDTO("이름1", 1),
                new SetRewardRequest.RewardDTO("리워드 이름2", 2)),
                room.getId());
        rewardService.setReward(setRewardRequest.getRewards(), setRewardRequest.getRoomId());
        Assertions.assertEquals(2, rewardRepository.count());
    }
}