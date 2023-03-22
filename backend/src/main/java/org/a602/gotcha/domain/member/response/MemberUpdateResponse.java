package org.a602.gotcha.domain.member.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberUpdateResponse {
	private Long id;
	private String nickname;
	private String organization;
	private String email;
	private String registrationId;
	private String profileImage;

	@Builder
	public MemberUpdateResponse(final Long id, final String nickname, final String organization, final String email,
		final String registrationId,
		final String profileImage) {
		this.id = id;
		this.nickname = nickname;
		this.organization = organization;
		this.email = email;
		this.registrationId = registrationId;
		this.profileImage = profileImage;
	}

}
