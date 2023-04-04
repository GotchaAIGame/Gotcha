package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import org.a602.gotcha.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateRequest {
	@NotNull
	@Schema(description = "회원 id")
	private final Long id;
	@NotNull
	@Schema(description = "닉네임")
	private final String nickname;
	@NotNull
	@Schema(description = "조직")
	private final String organization;
	@NotNull
	@Schema(description = "이메일")
	private final String email;
	@NotNull
	@Schema(description = "프로필 이미지")
	private final String profileImage;
	@NotNull
	@Schema(description = "가입경로")
	private final String registrationId;

	public Member toEntity() {
		return Member.builder()
			.id(id)
			.nickname(nickname)
			.organization(organization)
			.email(email)
			.registrationId(registrationId)
			.profileImage(profileImage)
			.build();
	}

}
