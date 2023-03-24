package org.a602.gotcha.domain.member.response;

import org.a602.gotcha.domain.member.entity.Member;

import lombok.Getter;

@Getter
public class MemberUpdateResponse {
	private final Long id;
	private final String nickname;
	private final String organization;
	private final String email;
	private final String registrationId;
	private final String profileImage;

	public MemberUpdateResponse(final Member member) {
		this.id = member.getId();
		this.nickname = member.getNickname();
		this.organization = member.getOrganization();
		this.email = member.getEmail();
		this.registrationId = member.getRegistrationId();
		this.profileImage = member.getProfileImage();
	}

}
