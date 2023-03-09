package org.a602.gotcha.domain.member;

import javax.validation.Valid;

import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

}
