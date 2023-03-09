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

	@PostMapping("/member/signup")
	public BaseResponse<MemberSignupResponse> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
		final MemberSignupResponse memberSignupResponse = memberService.signup(memberSignupRequest);

		return new BaseResponse<>(memberSignupResponse);
	}

	@GetMapping("/member/duplicateNickname")
	public BaseResponse<Boolean> login(@Valid @RequestParam String nickName) {
		final Boolean isDuplicate = memberService.isDuplicateNickName(nickName);

		return new BaseResponse<>(isDuplicate);
	}


}
