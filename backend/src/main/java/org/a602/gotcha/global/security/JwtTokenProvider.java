package org.a602.gotcha.global.security;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.a602.gotcha.domain.member.Member;
import org.a602.gotcha.domain.member.MemberDetailService;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.a602.gotcha.global.redis.RedisRefreshTokenRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	// AuthenticationProvider 역할도 겸임.
	public static final String X_AUTH_TOKEN = "X-AUTH-TOKEN";
	private String secretKey = "gotcha";

	private final MemberDetailService memberDetailService;
	private final RedisRefreshTokenRepository redisRefreshTokenRepository;

	@PostConstruct
	private void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// Jwt 토큰 생성
	public String createAccessToken(final Member member) {
		// Claim이란 JWT의 Payload에 들어가는 데이터 단위.
		// Map<String, Object>를 상속하고 있기 때문에 key, value형식으로 값을 넣을 수 있다.
		Claims claims = Jwts.claims().setSubject(member.getEmail());
		claims.put("roles", member.getAuthorities()); // 권한

		final long accessTokenValidSecond = Duration.ofMinutes(15).toMillis(); //access  토큰 유효시간 15분
		final Date now = new Date();

		return Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + accessTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();
	}

	// refreshToken 생성.
	public RefreshToken generateRefreshToken(String accessToken) {
		final RefreshToken refreshToken = new RefreshToken(UUID.randomUUID().toString(), accessToken);

		return redisRefreshTokenRepository.save(refreshToken);
	}

	// Jwt 토큰으로 인증 정보 조회
	public Authentication getAuthentication(String token) {
		final UserDetails userDetails = memberDetailService.loadUserByUsername(getUserEmail(token));

		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// Jwt 토큰에서 회원 구별 정보 추출(email).
	public String getUserEmail(String token) {
		return Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	public boolean validToken(String token) {
		if (token == null) {
			return false;
		}

		Claims claims = getClaims(token);

		return !Objects.requireNonNull(claims).getExpiration().before(new Date());

	}

	private Claims getClaims(final String token) {
		Claims claims;

		// 토큰에서 Claims 추출.
		try {
			claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
		} catch (ExpiredJwtException expiredJwtException) {
			throw new BadCredentialsException(GlobalErrorCode.TOKEN_EXPIRED.getMessage());
		} // 추가 예외처리

		return claims;
	}

}
