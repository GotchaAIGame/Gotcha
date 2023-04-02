package org.a602.gotcha.domain.reward.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.a602.gotcha.domain.reward.entity.QReward;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class RewardQueryRepository {

    private final JPAQueryFactory query;

    public RewardQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }
    QReward reward = QReward.reward;

    public void deleteRewardsByRoomId(Long roomId) {
        query.delete(reward)
                .where(reward.room.id.eq(roomId))
                .execute();
    }
}
