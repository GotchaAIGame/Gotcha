package org.a602.gotcha.global.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	public static final String BEARER = "Bearer";
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
		final FilterChain filterChain) throws
		IOException,
		ServletException {
		// 헤더에서 토큰부분을 분리
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		String token = null;

		// 키에 해당하는 헤더가 존재하고 그 값이 BEARER로 시작한다면 (JWT가 있다면)
		if (header != null && header.startsWith(BEARER)) {
			// prefix부분을 날리고 JWT만 token에 할당한다.
			token = header.substring(BEARER.length());
		}

		if (token != null && jwtTokenProvider.validAccessToken(token)) {
			// Authentication 객체 받아오기.
			final Authentication authentication = jwtTokenProvider.getAuthentication(token);
			// SecurityContextHolder에 저장.
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

}
