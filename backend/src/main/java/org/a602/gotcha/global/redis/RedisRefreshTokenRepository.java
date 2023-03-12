package org.a602.gotcha.global.redis;

import java.time.Duration;

import org.a602.gotcha.global.security.RefreshToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RedisRefreshTokenRepository {

	private final RedisTemplate<String, String> redisTemplate;

	public RefreshToken save(final RefreshToken refreshToken) {
		final ValueOperations<String, String> values = redisTemplate.opsForValue();
		values.set(refreshToken.getRefreshToken(), refreshToken.getAccessToken(), Duration.ofDays(1).toMillis());

		return refreshToken;
	}

}
