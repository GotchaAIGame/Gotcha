package org.a602.gotcha.global.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

	private final JwtTokenProvider jwtTokenProvider;

	// Reqeust로 들어오는 Jwt Token의 유효성을 검증 (jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록한다.
	@Override
	public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws
		IOException,
		ServletException {
		final String token = jwtTokenProvider.resolveToken((HttpServletRequest)request);

		if (token != null && jwtTokenProvider.validToken(token)) {
			final Authentication authentication = jwtTokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		chain.doFilter(request, response);
	}

}
