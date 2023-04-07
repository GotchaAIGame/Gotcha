package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginRequest {
	@NotNull
	@Schema(description = "이메일")
	private String email;
	@NotNull
	@Schema(description = "비밀번호")
	private String password;
}
