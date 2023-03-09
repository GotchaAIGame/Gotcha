package org.a602.gotcha.domain.participant.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.entity.QParticipant;
import org.a602.gotcha.domain.room.entity.Room;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class ParticipantQueryRepository {

    private final JPAQueryFactory query;
    public ParticipantQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }
    QParticipant participant = QParticipant.participant;

    public List<Participant> searchByRoomAndNickname(Room room, String nickname) {
        return query.selectFrom(participant)
                .where(
                        participant.room.eq(room),
                        participant.nickname.eq(nickname)
                )
                .fetch();
    }



}
