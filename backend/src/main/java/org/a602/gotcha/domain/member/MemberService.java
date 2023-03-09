package org.a602.gotcha.domain.member;

import java.util.List;

import org.a602.gotcha.global.security.JwtTokenProvider;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
	public MemberSignupResponse signup(final MemberSignupRequest memberSignupRequest) {
		final Member member = memberRepository.save(memberSignupRequest.toEntity());
		member.encodePassword(passwordEncoder);

		final String token = jwtTokenProvider.createToken(member.getEmail(),
			List.of(new SimpleGrantedAuthority(ROLE_USER)));

		return new MemberSignupResponse(member.getId(), member.getNickname(), member.getOrganization(),
			member.getEmail(), member.getRegistrationId(), token);
	}

	public Boolean isDuplicateNickName(final String nickName) {
		return memberRepository.existsMemberByNickname(nickName);
	}

	public Boolean isDuplicateEmail(final String email) {
		return memberRepository.existsMemberByEmail(email);
	}

}
