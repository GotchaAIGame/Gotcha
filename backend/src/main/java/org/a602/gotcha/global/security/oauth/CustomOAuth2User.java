package org.a602.gotcha.global.security.oauth;

/*
* OAuth2UserService에서 사용할 OAuth2User 객체를 커스텀한 클래스.
*
* ※ email : OAuth 로그인 시 처음 로그인일 경우, 내 서비스에서 Resource Server가 제공하지 않는
* 정보가 필요할 경우에, Resource Server가 아닌 내 서비스에서 해당 정보를 사용자에게 입력 받아야함.
*
* ※ role : OAuth 로그인 시 위의 추가 정보(사는 도시, 나이 등)을 입력했는지 (처음 OAuth 로그인인지)를 판단하기 위해 필요 처음 로그인하는 유저를
* Role.GUEST로 설정, 이후에 추가 정보를 입력해서 회원가입을 진행하면, Role.USER로 업데이트하는 식으로 설정 이렇게 하면,
* OAuth 로그인 회원 중 Role.GUEST인 회원은 처음 로그인이므로 SuccessHandler에서 추가 정보(사는 도시, 나이 등)를 입력하는 URL로 리다이렉트.
* (이후에 OAuth2LoginSuccessHandler에서 해당 이메일로 Token 발급 & 처리)
*
* */
//@Getter
//public class CustomOAuth2User extends DefaultOAuth2User {
//	private final String email;
//	private final Role role;
//
//	public CustomOAuth2User(final Collection<? extends GrantedAuthority> authorities,
//		final Map<String, Object> attributes, final String nameAttributeKey, final String email, final Role role) {
//		super(authorities, attributes, nameAttributeKey);
//		this.email = email;
//		this.role = role;
//	}
//
//}
