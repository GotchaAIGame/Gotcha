package org.a602.gotcha.domain.member.request;

import org.a602.gotcha.domain.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberSignupRequest {
	private String nickname;
	private String password;
	private String organization;
	private String email;

	@Builder
	public Member toEntity() {
		return Member.builder()
			.nickname(nickname)
			.password(password)
			.email(email)
			.organization(organization)
			.build();
	}

}
