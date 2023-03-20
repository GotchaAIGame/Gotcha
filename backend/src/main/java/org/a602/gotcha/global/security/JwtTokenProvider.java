package org.a602.gotcha.global.security;

import static org.springframework.http.HttpHeaders.*;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.a602.gotcha.domain.member.Member;
import org.a602.gotcha.domain.member.MemberDetailService;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.a602.gotcha.global.redis.RedisRefreshTokenRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
// AuthenticationProvider 역할도 겸임.
public class JwtTokenProvider {
	private String secretKey = "gotcha";
	public static final String BEARER = "Bearer";

	private final MemberDetailService memberDetailService;
	private final RedisRefreshTokenRepository redisRefreshTokenRepository;

	@PostConstruct
	private void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// Jwt 토큰 생성
	public String createAccessToken(final Member member) {
		// Claim이란 JWT의 Payload에 들어가는 데이터 단위.
		// Map<String, Object>를 상속하고 있기 때문에 key, value 형식으로 값을 넣을 수 있다.
		Claims claims = Jwts.claims().setSubject(member.getEmail());
		claims.put(AUTHORIZATION, member.getAuthorities()); // 권한

		final long accessTokenValidSecond = Duration.ofMinutes(15).toMillis(); //access  토큰 유효시간 15분
		final Date now = new Date();

		return BEARER + Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + accessTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();
	}

	// refreshToken 생성.
	public String createRefreshToken(final String accessToken, final String email) {
		//		final RefreshToken refreshToken = new RefreshToken(accessToken, UUID.randomUUID().toString());
		final long refreshTokenValidSecond = Duration.ofDays(7).toMillis(); //refresh  토큰 유효시간 7일
		final Date now = new Date();

		final String refreshToken = BEARER + Jwts.builder()
			.setSubject(email)
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + refreshTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();

		return redisRefreshTokenRepository.save(accessToken, refreshToken);
	}

	// Jwt 토큰으로 인증 정보 조회
	public Authentication getAuthentication(final String token) {
		final String userEmail = getUserEmail(token);
		String saveToken = token;
		UserDetails userDetails;

		if (userEmail == null) {
			final Optional<RefreshToken> byId = redisRefreshTokenRepository.findById(token);

			if (byId.isPresent()) {
				saveToken = byId.get().getAccessToken();
			}
		}

		userDetails = memberDetailService.loadUserByUsername(getUserEmail(saveToken));

		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// Jwt 토큰에서 회원 구별 정보 추출(email).
	public String getUserEmail(final String token) {
		return Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	public boolean validAccessToken(final String token) {
		Jws<Claims> claims;

		try {
			// 토큰에서 Claims 추출.
			claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

			return !claims.getBody().getExpiration().before(new Date());
		} catch (ExpiredJwtException expiredJwtException) {
			throw new JwtException(GlobalErrorCode.TOKEN_EXPIRED.getMessage());
		} catch (Exception exception) {
			throw new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED.getMessage());
		}
	}

	public String reCreateAccessToken(final String refreshToken, final Member member) {
		final Optional<RefreshToken> refreshTokenOptional = redisRefreshTokenRepository.findById(refreshToken);

		if (refreshTokenOptional.isPresent()) {
			// 기존 accessToken 토큰정보가 있을경우 그대로 반환.
			return refreshTokenOptional.get().getAccessToken();
		} else {
			final String newAccessToken = BEARER + createAccessToken(member);
			redisRefreshTokenRepository.update(refreshToken, newAccessToken);

			return newAccessToken;
		}
	}

	public String registerBlackList(final String accessToken, final String refreshToken) {
		String newAccessToken = splitToken(accessToken);

		final Authentication authentication = getAuthentication(newAccessToken); // 유저 객체 가져옴.
		Optional<RefreshToken> refreshTokenOptional;

		if (isLoginUser(refreshToken)) { // 로그인 한 유저인지 확인.
			refreshTokenOptional = redisRefreshTokenRepository.findById(newAccessToken);
			refreshTokenOptional.ifPresent(redisRefreshTokenRepository::deleteById);
		}

		final Long expiration = getExpiration(newAccessToken);
		redisRefreshTokenRepository.saveLogoutInfo(newAccessToken, expiration);

		return authentication.getName();
	}

	private static String splitToken(final String bearerToken) {
		String originToken = bearerToken;

		if (bearerToken != null && bearerToken.startsWith(BEARER)) {
			// prefix부분을 날리고 JWT만 token에 할당한다.
			originToken = bearerToken.substring(BEARER.length());
		} // token 확인.

		return originToken;
	}

	public Long getExpiration(final String refreshToken) {
		final Date date = new Date();
		final Date expiration = Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(refreshToken)
			.getBody()
			.getExpiration();

		return expiration.getTime() - date.getTime();
	}

	public boolean isLoginUser(final String refreshToken) {
		return redisRefreshTokenRepository.findById(splitToken(refreshToken)).isPresent();
	}

}
