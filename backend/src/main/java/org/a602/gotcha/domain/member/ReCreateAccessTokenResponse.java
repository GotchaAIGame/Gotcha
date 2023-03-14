package org.a602.gotcha.domain.member;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReCreateAccessTokenResponse {
	private final String accessToken;

	@Builder
	public ReCreateAccessTokenResponse(final String accessToken) {
		this.accessToken = accessToken;
	}

}
