package org.a602.gotcha.domain.member;

import java.util.NoSuchElementException;
import java.util.Optional;

import javax.persistence.EntityManagerFactory;

import org.a602.gotcha.global.error.GlobalErrorCode;
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
	private final EntityManagerFactory entityManagerFactory;

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
		String refreshToken;

		if (passwordEncoder.matches(memberLoginRequest.getPassword(), member.getPassword())) {
			accessToken = jwtTokenProvider.createAccessToken(member);
			refreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());
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
			.refreshToken(refreshToken)
			.build();
	}

	public String reCreateToken(final ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
		final Member member = memberRepository.findMemberByEmail(reCreateAccessTokenRequest.getEmail())
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		return jwtTokenProvider.reCreateAccessToken(reCreateAccessTokenRequest.getRefreshToken(),
			member);
	}

	public String logout(final MemberLogoutRequest memberLogoutRequest) {
		// logout유저가 새로 로그인 할 시 토큰을 새로 만들어서 로그인.
		// 기존 logout처리했던 토큰은 유효시간 지나면 자동으로 삭제됌.
		String logoutUser = null;

		if (jwtTokenProvider.isLoginUser(memberLogoutRequest.getRefreshToken())) {
			logoutUser = jwtTokenProvider.registerBlackList(memberLogoutRequest.getAccessToken(),
				memberLogoutRequest.getRefreshToken());
		}

		return logoutUser;
	}

	public MemberInformationResponse findMemberInformation(final Long id) {
		final Optional<Member> byId = memberRepository.findById(id);
		MemberInformationResponse memberInformationResponse = null;

		if (byId.isPresent()) {
			final Member member = byId.get();

			memberInformationResponse = MemberInformationResponse.builder()
				.nickname(member.getNickname())
				.email(member.getEmail())
				.organization(member.getOrganization())
				.registrationId(member.getRegistrationId())
				.profileImage(member.getProfileImage())
				.build();
		}

		return memberInformationResponse;
	}

	public Long deleteMemberById(final Long id) {
		memberRepository.deleteById(id);

		return id;
	}

	@Transactional
	public MemberUpdateResponse updateMember(final MemberUpdateRequest memberUpdateRequest) {
		final Member member = memberRepository.findById(memberUpdateRequest.getId())
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		member.updateMember(memberUpdateRequest.toEntity());

		return MemberUpdateResponse.builder()
			.id(member.getId())
			.email(member.getEmail())
			.registrationId(member.getRegistrationId())
			.organization(member.getOrganization())
			.nickname(member.getNickname())
			.profileImage(member.getProfileImage())
			.build();
	}

}
