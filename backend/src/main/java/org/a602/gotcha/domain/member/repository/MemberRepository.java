package org.a602.gotcha.domain.member.repository;

import org.a602.gotcha.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
