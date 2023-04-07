package org.a602.gotcha.domain.member.response;

import javax.validation.constraints.NotNull;

import org.a602.gotcha.domain.member.entity.Member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
public class MemberLoginResponse {
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
	@Schema(description = "가입경로")
	private final String registrationId;
	@NotNull
	@Schema(description = "프로필 이미지")
	private final String profileImage;
	@NotNull
	@Schema(description = "Access 토큰")
	private final String accessToken;
	@NotNull
	@Schema(description = "가입경로")
	private final String refreshToken;

	public MemberLoginResponse(final Member member, final String accessToken, final String refreshToken) {
		this.id = member.getId();
		this.nickname = member.getNickname();
		this.organization = member.getOrganization();
		this.email = member.getEmail();
		this.registrationId = member.getRegistrationId();
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.profileImage = member.getProfileImage();
	}

}
