package org.a602.gotcha.domain.participant.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.entity.QParticipant;
import org.a602.gotcha.domain.room.entity.QRoom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.Duration;
import java.util.List;

@Repository
public class ParticipantQueryRepository {

    private final JPAQueryFactory query;

    public ParticipantQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    QParticipant participant = QParticipant.participant;
    QRoom room = QRoom.room;

    public List<Participant> getTop3Rank(Long roomId) {
        return query.selectFrom(participant)
                .join(participant.room, room)
                .fetchJoin()
                .where(participant.room.id.eq(roomId))
                .orderBy(participant.duration.asc())
                .limit(3)
                .fetch();
    }

    public long getParticipantRank(Long roomId, Long participantId) {
        // Find the participant by ID and get their duration
        Duration participantDuration = query.select(participant.duration)
                .from(participant)
                .where(participant.id.eq(participantId))
                .fetchOne();

        // Count the number of participants with a lower duration in the same room
        long rank = query.selectFrom(participant)
                .join(participant.room, room)
                .where(participant.room.id.eq(roomId))
                .where(participant.duration.lt(participantDuration))
                .fetch().size();

        // Add 1 to the rank to get the participant's actual rank (since ranks start at 1)
        return rank + 1;
    }

}
