package org.a602.gotcha.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberSignupResponse {
	private Long id;
	private String nickname;
	private String organization;
	private String email;
	private String registrationId;
	private String accessToken;
}
