package org.a602.gotcha.domain.problemimage.repository;

import org.a602.gotcha.domain.problemimage.ProblemImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemImageRepository extends JpaRepository<ProblemImage, Long> {
}