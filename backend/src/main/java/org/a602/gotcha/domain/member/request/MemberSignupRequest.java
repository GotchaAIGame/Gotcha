package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import org.a602.gotcha.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberSignupRequest {
	@NotNull
	@Schema(description = "닉네임")
	private String nickname;
	@NotNull
	@Schema(description = "비밀번호")
	private String password;
	@NotNull
	@Schema(description = "조직")
	private String organization;
	@NotNull
	@Schema(description = "이메일")
	private String email;

	public Member toEntity() {
		return Member.builder()
			.nickname(nickname)
			.password(password)
			.email(email)
			.organization(organization)
			.build();
	}

}
