package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLogoutRequest {
	@NotNull
	@Schema(description = "Access 토큰")
	private String accessToken;
	@NotNull
	@Schema(description = "Refresh 토큰")
	private String refreshToken;

}
