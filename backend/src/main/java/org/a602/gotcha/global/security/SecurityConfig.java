package org.a602.gotcha.global.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	public static final String HEAD = "HEAD";
	public static final String OPTIONS = "OPTIONS";
	public static final String ALLOW_ORIGIN_PATTERN = "https://j8a602.p.ssafy.io/api/*";
	private final JwtTokenProvider jwtTokenProvider;
	public static final String ALLOW_PATTERN = "*";
	public static final String POST = "POST";
	public static final String GET = "GET";
	public static final String DELETE = "DELETE";
	public static final String PUT = "PUT";
	public static final String BASE_URL_PATTERN = "/**";
	public static final String ROLE_USER = "USER";
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
		"/api/post-docs/**",
		/*회원가입*/
		"/",
		"/api/test",
		"/api/game/**",
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
			.cors()
			.configurationSource(corsConfigurationSource())
			.and()
			.csrf()
			.disable() // rest api 이기 때문에 csrf 보안이 필요 없으므로 disable 처리한다.
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt Token으로 인증하므로 session 생성하지 않는다.
			.and()
			.authorizeRequests() // HttpServletRequest를 사용하는 요청에 대한 권한체크
			.antMatchers(PERMIT_URL_ARRAY)// 가입 및 로그인주소는 모두 접근 가능.
			.permitAll() // 위에서 지정한 인증없이 권한 허가.
			.and()
			.authorizeRequests()
			.requestMatchers(CorsUtils::isPreFlightRequest)
			.permitAll()
			.anyRequest() // 나머지 요청은
			.hasRole(ROLE_USER) // 인증된 회원만 접근가능.
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
		// 커스텀 필터를 ID/PW 기반으로 인증하는 기본 필터 앞에 넣어서 먼저 인증을 시도하게 한다.

		return httpSecurity.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.setAllowedOriginPatterns(List.of(ALLOW_ORIGIN_PATTERN));
		corsConfiguration.setAllowedMethods(Arrays.asList(POST, GET, DELETE, PUT, HEAD, OPTIONS));
		corsConfiguration.setAllowedHeaders(List.of(ALLOW_PATTERN));
		corsConfiguration.setAllowCredentials(true);

		final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration(BASE_URL_PATTERN, corsConfiguration);

		return urlBasedCorsConfigurationSource;
	}

}
