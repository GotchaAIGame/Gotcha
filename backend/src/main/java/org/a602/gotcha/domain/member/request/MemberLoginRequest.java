package org.a602.gotcha.domain.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLoginRequest {
	private String email;
	private String password;
}
