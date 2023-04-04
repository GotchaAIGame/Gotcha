package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class MemberSocialLoginRequest {
	@NotNull
	@Schema(description = "Access 토큰")
	private String accessToken;
	@NotNull
	@Schema(description = "가입경로")
	private String registrationId;
}
