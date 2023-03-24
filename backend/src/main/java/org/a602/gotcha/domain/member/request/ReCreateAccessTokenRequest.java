package org.a602.gotcha.domain.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReCreateAccessTokenRequest {
	private String accessToken;
	private String refreshToken;
	private String email;
}
