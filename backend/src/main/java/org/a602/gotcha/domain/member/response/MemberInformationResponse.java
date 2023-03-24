package org.a602.gotcha.domain.member.response;

import org.a602.gotcha.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class MemberInformationResponse {
	private final String nickname;
	private final String organization;
	private final String email;
	private final String registrationId;
	private final String profileImage;

	public MemberInformationResponse(final Member member) {
		this.nickname = member.getNickname();
		this.organization = member.getOrganization();
		this.email = member.getEmail();
		this.registrationId = member.getRegistrationId();
		this.profileImage = member.getProfileImage();
	}

}
