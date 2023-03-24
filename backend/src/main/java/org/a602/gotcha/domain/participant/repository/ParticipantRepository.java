package org.a602.gotcha.domain.participant.repository;

import org.a602.gotcha.domain.participant.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findParticipantByRoomIdAndNickname(Long roomId, String nickname);

}
