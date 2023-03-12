package org.a602.gotcha.global.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@RedisHash(value = "refreshToken")
public class RefreshToken {

	@Id
	private final String refreshToken;
	private final String accessToken;

}
