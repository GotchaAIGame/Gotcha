package org.a602.gotcha.domain.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberUpdateRequest {
	private final Long id;
	private final String nickname;
	private final String organization;
	private final String email;
	private final String registrationId;
	private final String profileImage;

	public Member toEntity(){
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
