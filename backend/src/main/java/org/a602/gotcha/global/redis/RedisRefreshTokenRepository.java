package org.a602.gotcha.global.redis;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.a602.gotcha.global.security.RefreshToken;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RedisRefreshTokenRepository {
	public static final String LOGOUT = "logout";
	private final RedisTemplate<String, String> redisTemplate;

	public String save(final String accessToken, final String refreshToken) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
		stringStringValueOperations.set(refreshToken, accessToken);
		redisTemplate.expire(refreshToken, Duration.ofDays(14).toMillis(), TimeUnit.MILLISECONDS);

		return refreshToken;
	}

	public Optional<RefreshToken> findById(final String refreshToken) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
		final String accessToken = stringStringValueOperations.get(refreshToken);

		if (accessToken == null) {
			return Optional.empty();
		}

		return Optional.of(new RefreshToken(refreshToken, accessToken));
	}

	public void update(final RefreshToken refreshToken) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
		final Long expire = redisTemplate.getExpire(refreshToken.getRefreshToken());

		if (expire != null) {
			stringStringValueOperations.set(refreshToken.getRefreshToken(), refreshToken.getAccessToken(), expire,
				TimeUnit.MILLISECONDS);
		}
	}

	public void deleteById(final RefreshToken refreshToken) {
		redisTemplate.delete(refreshToken.getRefreshToken());
	}

	public void saveLogoutInfo(final String accessToken, final Long expiration) {
		final ValueOperations<String, String> stringStringValueOperations = redisTemplate.opsForValue();
		stringStringValueOperations.set(accessToken, LOGOUT, expiration, TimeUnit.MILLISECONDS);
	}

}
