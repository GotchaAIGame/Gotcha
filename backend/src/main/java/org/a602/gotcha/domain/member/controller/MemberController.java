package org.a602.gotcha.domain.member.controller;

import javax.validation.Valid;

import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberLogoutRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.request.MemberUpdateRequest;
import org.a602.gotcha.domain.member.request.ReCreateAccessTokenRequest;
import org.a602.gotcha.domain.member.response.MemberInformationResponse;
import org.a602.gotcha.domain.member.response.MemberLoginResponse;
import org.a602.gotcha.domain.member.response.MemberUpdateResponse;
import org.a602.gotcha.domain.member.service.MemberService;
import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Member", description = "유저(출제자) 관련 API")
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/test")
	public String test() {
		return "<h1>test 통과</h1>";
	}

	@PostMapping("/member/signup")
	public BaseResponse<Long> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
		final Long memberId = memberService.signup(memberSignupRequest);

		return new BaseResponse<>(memberId);
	}

	@GetMapping("/member/duplicateNickname")
	public BaseResponse<Boolean> isDuplicateNickname(@Valid @RequestParam String nickname) {
		final Boolean isDuplicate = memberService.isDuplicateNickname(nickname);

		return new BaseResponse<>(isDuplicate);
	}

	@GetMapping("/member/duplicateEmail")
	public BaseResponse<Boolean> isDuplicateEmail(@Valid @RequestParam String email) {
		final Boolean isDuplicate = memberService.isDuplicateEmail(email);

		return new BaseResponse<>(isDuplicate);
	}

	@PostMapping("/member/login")
	public BaseResponse<MemberLoginResponse> login(@Valid @RequestBody MemberLoginRequest memberLoginRequest) {
		final MemberLoginResponse loginUser = memberService.login(memberLoginRequest);

		return new BaseResponse<>(loginUser);
	}

	@PostMapping("/member/reCreate")
	public BaseResponse<String> reCreateTokens(
		@Valid @RequestBody ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
		final String newAccessToken = memberService.reCreateToken(reCreateAccessTokenRequest);

		return new BaseResponse<>(newAccessToken);
	}

	@PostMapping("/member/logout")
	public BaseResponse<String> logout(@Valid @RequestBody MemberLogoutRequest memberLogoutRequest) {
		final String logoutRefreshToken = memberService.logout(memberLogoutRequest);

		return new BaseResponse<>(logoutRefreshToken);
	}

	@GetMapping("/member")
	public BaseResponse<MemberInformationResponse> findMemberInfo(@Valid @RequestParam Long id) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(id);

		return new BaseResponse<>(memberInformation);
	}

	@DeleteMapping("/member/{id}")
	public BaseResponse<Long> deleteMember(@Valid @PathVariable Long id) {
		final Long deleteId = memberService.deleteMemberById(id);

		return new BaseResponse<>(deleteId);
	}

	@PutMapping("/member")
	public BaseResponse<MemberUpdateResponse> updateMember(
		@Valid @RequestBody MemberUpdateRequest memberUpdateRequest) {
		final MemberUpdateResponse memberUpdateResponse = memberService.updateMember(memberUpdateRequest);

		return new BaseResponse<>(memberUpdateResponse);
	}

}
