package org.a602.gotcha.global.security.oauth;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

	public static final String NICKNAME = "nickname";
	public static final String KAKAO_ACCOUNT = "kakao_account";
	public static final String PROFILE = "profile";
	public static final String ID = "id";
	public static final String EMAIL = "email";
	public static final String THUMBNAIL_IMAGE_URL = "thumbnail_image_url";

	public KakaoOAuth2UserInfo(final Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return String.valueOf(attributes.get(ID));
	}

	@Override
	public String getNickName() {
		final Map<String, Object> account = (Map<String, Object>)attributes.get(KAKAO_ACCOUNT);
		final Map<String, Object> profile = (Map<String, Object>)account.get(PROFILE);

		if (profile == null) {
			return null;
		}

		return (String)profile.get(NICKNAME);
	}

	@Override
	public String getImageUrl() {
		Map<String, Object> account = (Map<String, Object>)attributes.get(KAKAO_ACCOUNT);
		Map<String, Object> profile = (Map<String, Object>)account.get(PROFILE);

		if (profile == null) {
			return null;
		}

		return (String)profile.get(THUMBNAIL_IMAGE_URL);
	}

	@Override
	public String getEmail() {
		final Map<String, Object> account = (Map<String, Object>)attributes.get(KAKAO_ACCOUNT);

		return String.valueOf(account.get(EMAIL));
	}

}
