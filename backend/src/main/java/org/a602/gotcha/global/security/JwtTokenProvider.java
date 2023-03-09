package org.a602.gotcha.global.security;

import java.util.Base64;
import java.util.Collection;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.a602.gotcha.domain.member.MemberDetailService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	public final String X_AUTH_TOKEN = "X-AUTH-TOKEN";
	private String secretKey = "gotcha";
	private final MemberDetailService memberDetailService;

	@PostConstruct
	private void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// Jwt 토큰 생성
	public String createToken(final String email, final Collection<? extends GrantedAuthority> authorities) {
		Claims claims = Jwts.claims().setSubject(email);
		claims.put("roles", authorities);

		final long tokenValidSecond = 1000L * 60 * 60; // 토큰 유효시간 60분
		final Date now = new Date();

		return Jwts.builder()
			.setClaims(claims) // 데이터
			.setIssuedAt(now)  // 토큰 발행 일자
			.setExpiration(new Date(now.getTime() + tokenValidSecond)) // 토큰 만료시간 설정.
			.signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret key값 설정
			.compact();
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

	// Request Header에서 Token 파싱 : X-AUTH-TOKEN: jwt 토큰
	public String resolveToken(final HttpServletRequest httpServletRequest) {
		return httpServletRequest.getHeader(X_AUTH_TOKEN);
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	public boolean validToken(String jwtToken) {
		try {
			final Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);

			return !claimsJws.getBody().getExpiration().before(new Date());
		} catch (Exception exception) {
			return false;
		}

	}

}
