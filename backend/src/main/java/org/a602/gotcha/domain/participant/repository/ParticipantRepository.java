package org.a602.gotcha.domain.participant.repository;

import org.a602.gotcha.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Participant findParticipantByRoomIdAndNickname(Long roomId, String nickname);

}
