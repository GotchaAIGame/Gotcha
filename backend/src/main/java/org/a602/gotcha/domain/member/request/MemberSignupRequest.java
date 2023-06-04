package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@RequiredArgsConstructor(staticName = "of")
public final class MemberSignupRequest {
	@NotNull
	@Schema(description = "닉네임")
	private final String nickname;
	@NotNull
	@Schema(description = "비밀번호")
	private final String password;
	@NotNull
	@Schema(description = "조직")
	private final String organization;
	@NotNull
	@Schema(description = "이메일")
	private final String email;

	public Member toEntity() {
		return Member.builder()
			.nickname(nickname)
			.password(password)
			.email(email)
			.organization(organization)
			.build();
	}

}
