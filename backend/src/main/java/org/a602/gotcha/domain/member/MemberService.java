package org.a602.gotcha.domain.member;

import org.a602.gotcha.global.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	public static final String ROLE_USER = "USER";

	@Transactional
	public Long signup(final MemberSignupRequest memberSignupRequest) {
		final Member member = memberRepository.save(memberSignupRequest.toEntity());
		member.encodePassword(passwordEncoder);

		return member.getId();
	}

	public Boolean isDuplicateNickname(final String nickname) {
		return memberRepository.existsMemberByNickname(nickname);
	}

	public Boolean isDuplicateEmail(final String email) {
		return memberRepository.existsMemberByEmail(email);
	}

}
