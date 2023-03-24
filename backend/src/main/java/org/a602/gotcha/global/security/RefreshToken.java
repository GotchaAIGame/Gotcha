package org.a602.gotcha.global.security;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RefreshToken {
	@Id
	private final String accessToken;
	private final String refreshToken;
}
