package org.a602.gotcha.domain.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInformationResponse {
	private final String nickname;
	private final String organization;
	private final String email;
	private final String registrationId;
	private final String profileImage;

	@Builder
	public MemberInformationResponse(final String nickname, final String organization, final String email,
		final String registrationId,
		final String profileImage) {
		this.nickname = nickname;
		this.organization = organization;
		this.email = email;
		this.registrationId = registrationId;
		this.profileImage = profileImage;
	}

}
