package org.a602.gotcha.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtTokenProvider jwtTokenProvider;

	private static final String[] PERMIT_URL_ARRAY = {
		/* swagger v2 */
		"/api/v2/api-docs",
		"/api/swagger-resources",
		"/api/swagger-resources/**",
		"/api/configuration/ui",
		"/api/configuration/security",
		"/api/swagger-ui.html",
		"/api/webjars/**",
		/* swagger v3 */
		"/api/v3/api-docs/**",
		"/api/swagger-ui/**",
		"/api/post-docs/swagger-config/**",
		/*회원가입*/
		"/",
		"/api/member/signup",
		"/api/member/login",
		"/api/member/duplicateNickname",
		"/api/member/duplicateEmail",
		"/actuator/**"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.httpBasic()
			.disable() // rest api 이기 때문에 기본 설정을 사용하지 않는다. (기본설정은 비인증시 로그인 화면으로 리다이렉트)
			.csrf()
			.disable() // rest api 이기 때문에 csrf 보안이 필요 없으므로 disable 처리한다.
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt Token으로 인증하므로 session 생성하지 않는다.
			.and()
			.authorizeRequests() // HttpServletRequest를 사용하는 요청에 대한 권한체크
			.antMatchers(PERMIT_URL_ARRAY)// 가입 및 로그인주소는 모두 접근 가능.
			.permitAll() // 위에서 지정한 인증없이 권한 허가.
			.anyRequest() // 나머지 요청은
			.hasRole("USER") // 인증된 회원만 접근가능.
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		// 커스텀 필터를 ID/PW 기반으로 인증하는 기본 필터 앞에 넣어서 먼저 인증을 시도하게 한다.

		return httpSecurity.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

}
