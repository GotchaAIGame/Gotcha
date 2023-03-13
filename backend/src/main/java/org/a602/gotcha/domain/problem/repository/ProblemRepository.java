package org.a602.gotcha.domain.problem.repository;

import org.a602.gotcha.domain.problem.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByRoomId(Long roomId);

}
