package org.a602.gotcha.domain.member;

import javax.validation.Valid;

import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
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
		final String logoutUser = memberService.logout(memberLogoutRequest);

		return new BaseResponse<>(logoutUser);
	}

	@GetMapping("/member")
	public BaseResponse<MemberInformationResponse> findMemberInfo(@Valid @RequestParam Long id) {
		final MemberInformationResponse memberInformation = memberService.findMemberInformation(id);

		return new BaseResponse<>(memberInformation);
	}

}
