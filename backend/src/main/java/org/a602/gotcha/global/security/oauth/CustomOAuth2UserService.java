package org.a602.gotcha.global.security.oauth;

import java.util.Map;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/*
 * OAuth2UserService를 커스텀한 CustomOAuth2UserService.
 * OAuth2 로그인의 로직을 담당.
 * */

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(final OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		log.info("OAuth2 로그인 요청 진입");

		/*
		 * DefaultOAuth2UserService 객체를 생성하여, loadUser(userRequest)를 통해 DefaultOAuth2User 객체를 생성 후 반환
		 * DefaultOAuth2UserService의 loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서
		 * 사용자 정보를 얻은 후, 이를 통해 DefaultOAuth2User 객체를 생성 후 반환한다.
		 * 결과적으로, OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저
		 */
		final OAuth2UserService<OAuth2UserRequest, OAuth2User> defaultOAuth2UserService = new DefaultOAuth2UserService();
		final OAuth2User oAuth2User = defaultOAuth2UserService.loadUser(userRequest);

		final String registrationId = userRequest.getClientRegistration().getRegistrationId();
		final SocialType socialType = getSocialType(registrationId);
		final String userNameAttributeName = userRequest.getClientRegistration()
			.getProviderDetails()
			.getUserInfoEndpoint()
			.getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값
		final Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

		// socialType에 따라 유저 정보를 통해 OAuthAttributes 객체 생성
		final OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);
		final Member user = getUser(extractAttributes, socialType);// getUser() 메소드로 User 객체 생성 후 반환

		log.info("로그인 요청 유저 정보: " + user);

		// DefaultOAuth2User를 구현한 CustomOAuth2User 객체를 생성해서 반환
		return new DefaultOAuth2User(
			user.getAuthorities(),
			attributes,
			extractAttributes.getNameAttributeKey()
		);
	}

	public SocialType getSocialType(final String registrationId) {
		if (SocialType.KAKAO.getSocialType().equals(registrationId)) {
			return SocialType.KAKAO;
		}

		return SocialType.GOOGLE;
	}

	/*
	 * SocialType과 attributes에 들어있는 소셜 로그인의 email를 통해 회원을 찾아 반환하는 메소드
	 * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장.
	 */
	public Member getUser(final OAuthAttributes extractAttributes, final SocialType socialType) {
		return memberRepository.findMemberByRegistrationIdAndEmail(socialType.getSocialType(),
			extractAttributes.getOAuth2UserInfo().getEmail()).orElse(saveUser(extractAttributes, socialType));
	}

	/*
	 * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 User 객체 생성 후 반환
	 * 생성된 User 객체를 DB에 저장 : registrationId, email, role 값만 있는 상태
	 */
	private Member saveUser(final OAuthAttributes extractAttributes, final SocialType socialType) {
		final Member member = extractAttributes.toEntity(socialType, extractAttributes.getOAuth2UserInfo());

		return memberRepository.save(member);
	}

}
