package org.a602.gotcha.domain.reward.repository;

import org.a602.gotcha.domain.reward.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    List<Reward> findByRoomId(Long id);
    List<Reward> findRewardsByRoomId(Long roomId);
}
