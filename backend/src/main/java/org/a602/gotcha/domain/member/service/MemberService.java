package org.a602.gotcha.domain.member.service;

import static org.a602.gotcha.global.security.JwtTokenProvider.*;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberLogoutRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.request.MemberUpdateRequest;
import org.a602.gotcha.domain.member.request.ReCreateAccessTokenRequest;
import org.a602.gotcha.domain.member.response.MemberInformationResponse;
import org.a602.gotcha.domain.member.response.MemberLoginResponse;
import org.a602.gotcha.domain.member.response.MemberUpdateResponse;
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

	@Transactional(readOnly = true)
	public MemberLoginResponse login(final MemberLoginRequest memberLoginRequest) {
		final Optional<Member> memberByEmail = memberRepository.findMemberByEmail(memberLoginRequest.getEmail());
		memberByEmail.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		final Member member = memberByEmail.get();
		String accessToken;
		String refreshToken;

		if (passwordEncoder.matches(memberLoginRequest.getPassword(), member.getPassword())) {
			accessToken = BEARER + jwtTokenProvider.createAccessToken(member);
			refreshToken = BEARER + jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());
		} else {
			throw new IllegalArgumentException(GlobalErrorCode.MISMATCH_PASSWORD.getMessage());
		}

		return new MemberLoginResponse(member, accessToken, refreshToken);
	}

	@Transactional(readOnly = true)
	public String reCreateToken(final ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
		final Member member = memberRepository.findMemberByEmail(reCreateAccessTokenRequest.getEmail())
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		return BEARER + jwtTokenProvider.reCreateAccessToken(reCreateAccessTokenRequest.getRefreshToken(), member);
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
		final Member member = memberRepository.findById(id)
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));

		return new MemberInformationResponse(member);
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

		return new MemberUpdateResponse(member);
	}

}
