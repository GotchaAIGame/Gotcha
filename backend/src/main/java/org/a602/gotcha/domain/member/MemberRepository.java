package org.a602.gotcha.domain.member;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findMemberByEmail(final String email);

	Boolean existsMemberByEmail(final String email);

	Boolean existsMemberByNickname(final String nickname);

}
