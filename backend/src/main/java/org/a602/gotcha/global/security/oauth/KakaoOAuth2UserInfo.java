package org.a602.gotcha.global.security.oauth;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
	public KakaoOAuth2UserInfo(final Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return null;
	}

	@Override
	public String getNickName() {
		return null;
	}

	@Override
	public String getImageUrl() {
		return null;
	}

	@Override
	public String getEmail() {
		return null;
	}

}
