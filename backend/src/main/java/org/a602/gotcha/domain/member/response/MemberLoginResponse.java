package org.a602.gotcha.domain.member.response;

import org.a602.gotcha.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class MemberLoginResponse {
	private final Long id;
	private final String nickname;
	private final String organization;
	private final String email;
	private final String registrationId;
	private final String accessToken;
	private final String refreshToken;
	private final String profileImage;

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
