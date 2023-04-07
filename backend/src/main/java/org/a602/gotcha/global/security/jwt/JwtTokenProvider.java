package org.a602.gotcha.global.security.jwt;

import static org.springframework.http.HttpHeaders.*;
import static org.springframework.security.config.Elements.*;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.request.MemberLogoutRequest;
import org.a602.gotcha.domain.member.service.MemberDetailService;
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
	public static final String SPLIT_REGEX = " ";
	private String secretKey = "gotcha";
	public static final String BEARER = "Bearer ";

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

		final long accessTokenValidSecond = Duration.ofDays(1).toMillis(); //access토큰 유효시간
		//		final long accessTokenValidSecond = Duration.ofSeconds(1).toMillis(); //테스트용 access토큰 유효시간
		final Date now = new Date();

		return Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + accessTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();
	}

	// refreshToken 생성.
	public String createRefreshToken(final String accessToken, final String email) {
		final long refreshTokenValidSecond = Duration.ofDays(14).toMillis(); //refresh토큰 유효시간
		final Date now = new Date();

		final String refreshToken = Jwts.builder()
			.setSubject(email)
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + refreshTokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘, secret key값 설정
			.compact();

		redisRefreshTokenRepository.save(accessToken, refreshToken);

		return refreshToken;
	}

	// Jwt 토큰으로 인증 정보 조회
	public Authentication getAuthentication(final String accessToken) {
		final String userEmail = getUserEmail(accessToken);
		String saveToken = accessToken;
		UserDetails userDetails;

		if (userEmail == null) {
			final RefreshToken refreshToken = redisRefreshTokenRepository.findById(accessToken)
				.orElseThrow(() -> new JwtException(GlobalErrorCode.TOKEN_EXPIRED.getMessage()));

			saveToken = refreshToken.getAccessToken();
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
		final String newAccessToken = createAccessToken(member);
		redisRefreshTokenRepository.save(newAccessToken, refreshToken);

		return newAccessToken;
	}

	public Optional<String> registerLogoutUser(final MemberLogoutRequest memberLogoutRequest) {
		final String accessToken = splitToken(memberLogoutRequest.getAccessToken());
		final Authentication authentication = getAuthentication(accessToken); // 유저 객체 가져옴.

		if (isLoginUser(memberLogoutRequest.getAccessToken())) {
			final Optional<RefreshToken> accessTokenOptional = redisRefreshTokenRepository.findById(accessToken);
			accessTokenOptional.ifPresent(redisRefreshTokenRepository::deleteById);
		}

		final Long expiration = getExpiration(accessToken);
		redisRefreshTokenRepository.saveLogoutInfo(accessToken, expiration);

		return Optional.ofNullable(authentication.getName());
	}

	public String splitToken(final String bearerToken) {
		String originToken = bearerToken;

		// prefix부분을 날리고 JWT만 token에 할당한다.
		if (bearerToken != null && bearerToken.startsWith(BEARER)) {
			originToken = splitBearer(bearerToken);
		} // token 확인.

		return originToken;
	}

	public Long getExpiration(final String token) {
		final Date date = new Date();
		final Date expiration = Jwts.parser()
			.setSigningKey(secretKey)
			.parseClaimsJws(token)
			.getBody()
			.getExpiration();

		return expiration.getTime() - date.getTime();
	}

	public boolean isLoginUser(final String accessToken) {
		return redisRefreshTokenRepository.findById(splitToken(accessToken)).isPresent();
	}

	public boolean isLogoutUser(final String accessToken) {
		final Optional<RefreshToken> refreshTokenOptional = redisRefreshTokenRepository.findById(
			splitToken(accessToken));

		return refreshTokenOptional.isPresent() && refreshTokenOptional.get().getRefreshToken().equals(LOGOUT);
	}

	public String splitBearer(final String bearerToken) {
		return bearerToken.split(SPLIT_REGEX)[1];
	}
}
