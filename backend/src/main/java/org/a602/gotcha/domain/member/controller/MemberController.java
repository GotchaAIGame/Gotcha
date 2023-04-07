package org.a602.gotcha.domain.member.controller;

import javax.validation.Valid;

import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberLogoutRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.request.MemberSocialLoginRequest;
import org.a602.gotcha.domain.member.request.MemberUpdateRequest;
import org.a602.gotcha.domain.member.request.ReCreateAccessTokenRequest;
import org.a602.gotcha.domain.member.response.MemberInformationResponse;
import org.a602.gotcha.domain.member.response.MemberLoginResponse;
import org.a602.gotcha.domain.member.response.MemberUpdateResponse;
import org.a602.gotcha.domain.member.service.MemberService;
import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Member", description = "유저(출제자) 관련 API")
public class MemberController {

	private final MemberService memberService;

	@Operation(description = "Test API", summary = "Test API")
	@PostMapping("/test")
	public String test() {
		return "<h1>test 통과</h1>";
	}

	@Operation(description = "회원가입 API", summary = "회원가입 API")
	@ApiResponse(responseCode = "200", description = "회원가입 성공")
	@PostMapping("/member/signup")
	public BaseResponse<Long> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
		final Long memberId = memberService.signup(memberSignupRequest);

		return new BaseResponse<>(memberId);
	}

	@Operation(description = "(출제자용)닉네임 중복확인 API", summary = "(출제자용)닉네임 중복확인 API")
	@ApiResponse(responseCode = "200", description = "닉네임 중복확인 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@GetMapping("/member/duplicateNickname")
	public BaseResponse<Boolean> isDuplicateNickname(@Valid @RequestParam String nickname) {
		final Boolean isDuplicate = memberService.isDuplicateNickname(nickname);

		return new BaseResponse<>(isDuplicate);
	}

	@Operation(description = "(출제자용)이메일 중복확인 API", summary = "(출제자용)이메일 중복확인 API")
	@ApiResponse(responseCode = "200", description = "이메일 중복확인 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@GetMapping("/member/duplicateEmail")
	public BaseResponse<Boolean> isDuplicateEmail(@Valid @RequestParam String email) {
		final Boolean isDuplicate = memberService.isDuplicateEmail(email);

		return new BaseResponse<>(isDuplicate);
	}

	@Operation(description = "(출제자용)소셜 로그인 API", summary = "(출제자용)소셜 로그인 API")
	@ApiResponse(responseCode = "200", description = "소셜 로그인 성공", content = @Content(schema = @Schema(implementation = Boolean.class)))
	@PostMapping("/member/social/login")
	public BaseResponse<MemberLoginResponse> socialLogin(
		@Valid @RequestBody MemberSocialLoginRequest memberSocialLoginRequest) {
		final MemberLoginResponse memberLoginResponse = memberService.socialLogin(memberSocialLoginRequest);

		return new BaseResponse<>(memberLoginResponse);
	}

	@Operation(description = "(출제자용)로그인 API", summary = "(출제자용)로그인 API")
	@ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(implementation = MemberLoginResponse.class)))
	@ApiResponse(responseCode = "404", description = "해당하는 이메일 찾을 수 없음")
	@ApiResponse(responseCode = "401", description = "로그인 정보 일치하지 않음")
	@PostMapping("/member/login")
	public BaseResponse<MemberLoginResponse> login(@Valid @RequestBody MemberLoginRequest memberLoginRequest) {
		final MemberLoginResponse loginUser = memberService.login(memberLoginRequest);

		return new BaseResponse<>(loginUser);
	}

	@Operation(description = "토큰 재생성 API", summary = "토큰 재생성 API")
	@ApiResponse(responseCode = "200", description = "신규 엑세스 토큰 발급 완료", content = @Content(schema = @Schema(implementation = String.class)))
	@ApiResponse(responseCode = "404", description = "해당하는 이메일 찾을 수 없음")
	@PostMapping("/member/reCreate")
	public BaseResponse<String> reCreateTokens(
		@Valid @RequestBody ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
		final String newAccessToken = memberService.reCreateToken(reCreateAccessTokenRequest);

		return new BaseResponse<>(newAccessToken);
	}

	@Operation(description = "(출제자용)로그아웃 API", summary = "(출제자용)로그아웃 API")
	@ApiResponse(responseCode = "200", description = "로그아웃 성공")
	@ApiResponse(responseCode = "401", description = "로그아웃 권한이 없음")
	@PostMapping("/member/logout")
	public BaseResponse<String> logout(@Valid @RequestBody MemberLogoutRequest memberLogoutRequest) {
		final String logoutUser = memberService.logout(memberLogoutRequest);

		return new BaseResponse<>(logoutUser);
	}

	@Operation(description = "(출제자용)유저 정보 조회하기 API", summary = "(출제자용)유저 정보 조회하기 API")
	@ApiResponse(responseCode = "200", description = "유저정보 불러오기 성공")
	@ApiResponse(responseCode = "404", description = "유저정보 찾을 수 없음")
	@GetMapping("/member")
	public BaseResponse<MemberInformationResponse> findMemberInfo(@Valid @RequestParam Long id) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(id);

		return new BaseResponse<>(memberInformation);
	}

	@Operation(description = "(출제자용)회원 탈퇴하기 API", summary = "(출제자용)회원 탈퇴하기 API")
	@ApiResponse(responseCode = "200", description = "탈퇴하기 성공")
	@DeleteMapping("/member")
	public BaseResponse<Long> deleteMember(@Valid @RequestParam Long id) {
		final Long deleteId = memberService.deleteMemberById(id);

		return new BaseResponse<>(deleteId);
	}

	@Operation(description = "(출제자용)회원 정보 수정하기 API", summary = "(출제자용)회원 정보 수정하기 API")
	@ApiResponse(responseCode = "200", description = "회원 정보 수정 성공")
	@ApiResponse(responseCode = "404", description = "회원 정보 찾을 수 없음")
	@PutMapping("/member")
	public BaseResponse<MemberUpdateResponse> updateMember(
		@Valid @RequestBody MemberUpdateRequest memberUpdateRequest) {
		final MemberUpdateResponse memberUpdateResponse = memberService.updateMember(memberUpdateRequest);

		return new BaseResponse<>(memberUpdateResponse);
	}

}
