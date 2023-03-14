package org.a602.gotcha.domain.member;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.a602.gotcha.global.error.GlobalErrorCode;
import org.a602.gotcha.global.security.JwtTokenProvider;
import org.a602.gotcha.global.security.RefreshToken;
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

	public MemberLoginResponse login(final MemberLoginRequest memberLoginRequest) {
		final Optional<Member> memberByEmail = memberRepository.findMemberByEmail(memberLoginRequest.getEmail());
		memberByEmail.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		final Member member = memberByEmail.get();
		String accessToken;
		RefreshToken refreshToken;

		if (passwordEncoder.matches(memberLoginRequest.getPassword(), member.getPassword())) {
			accessToken = jwtTokenProvider.createAccessToken(member);
			refreshToken = jwtTokenProvider.createRefreshToken(accessToken);
		} else {
			throw new IllegalArgumentException(GlobalErrorCode.MISMATCH_PASSWORD.getMessage());
		}

		return MemberLoginResponse.builder()
			.id(member.getId())
			.email(member.getEmail())
			.nickname(member.getNickname())
			.organization(member.getOrganization())
			.registrationId(member.getRegistrationId())
			.accessToken(accessToken)
			.refreshToken(refreshToken.getRefreshToken())
			.build();
	}

	public ReCreateAccessTokenResponse reIssueAccessToken(final ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
		final Member member = memberRepository.findMemberByEmail(reCreateAccessTokenRequest.getEmail())
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		String newAccessToken;

		if (jwtTokenProvider.validAccessToken(reCreateAccessTokenRequest.getAccessToken())) {
			newAccessToken = reCreateAccessTokenRequest.getAccessToken();
		} else {
			newAccessToken = jwtTokenProvider.reCreateAccessToken(reCreateAccessTokenRequest.getRefreshToken(), member);
		}

		return ReCreateAccessTokenResponse.builder()
			.accessToken(newAccessToken)
			.build();
	}

}
