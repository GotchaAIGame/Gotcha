package org.a602.gotcha.global.security.oauth;

import java.util.Map;

import org.a602.gotcha.domain.member.entity.Member;

import lombok.Builder;
import lombok.Getter;

/*
 * 각 소셜에서 받아오는 데이터가 다름.
 * 각 소셜에서 받아오는 데이터를 분기하는 OAuth DTO 클래스
 * */
@Getter
public class OAuthAttributes {
	private final OAuth2UserInfo oAuth2UserInfo;
	private final String nameAttributeKey;

	@Builder
	public OAuthAttributes(final OAuth2UserInfo oAuth2UserInfo, final String nameAttributeKey) {
		this.oAuth2UserInfo = oAuth2UserInfo;
		this.nameAttributeKey = nameAttributeKey;
	}

	/*
	 * CustomOAuth2UserService에서 파라미터들을 주입해서 OAuthAttributes 객체를 생성하는 메소드
	 * 파라미터로 들어온 SocialType 별로 분기 처리하여 각 소셜 타입에 맞게 OAuthAttributes를 생성
	 * */
	public static OAuthAttributes of(final SocialType socialType, final String userNameAttributeName,
		final Map<String, Object> attributes) {
		if (SocialType.GOOGLE.equals(socialType)) {
			return ofGoogle(userNameAttributeName, attributes);
		}

		return ofKakao(userNameAttributeName, attributes);
	}

	/*
	 * 소셜 타입 별로 나눠서 빌더로 OAuthAttributes 빌드 시
	 * 유저 정보 추상 클래스인 OAuth2UserInfo 필드에 각 소셜 타입의 OAuth2UserInfo를 생성하여 빌드
	 * */
	private static OAuthAttributes ofKakao(final String userNameAttributeName, final Map<String, Object> attributes) {
		return OAuthAttributes.builder()
			.nameAttributeKey(userNameAttributeName)
			.oAuth2UserInfo(new KakaoOAuth2UserInfo(attributes))
			.build();
	}

	private static OAuthAttributes ofGoogle(final String userNameAttributeName, final Map<String, Object> attributes) {
		return OAuthAttributes.builder()
			.nameAttributeKey(userNameAttributeName)
			.oAuth2UserInfo(new GoogleOAuth2UserInfo(attributes))
			.build();
	}

	/*
	 * of 메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
	 * OAuth2UserInfo에서 email, nickname, imageUrl 등을 가져와서 build
	 * email에는 UUID로 중복 없는 랜덤 값 생성
	 * role은 GUEST로 설정
	 */
	public Member toEntity(final SocialType socialType, final OAuth2UserInfo oAuth2UserInfo) {
		return Member.builder()
			.nickname(oAuth2UserInfo.getNickName())
			.email(oAuth2UserInfo.getEmail())
			.profileImage(oAuth2UserInfo.getImageUrl())
			.registrationId(socialType.getSocialType())
			.build();
	}

}
