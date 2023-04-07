package org.a602.gotcha.global.security.oauth;

import java.util.Map;

public abstract class OAuth2UserInfo {
	protected Map<String, Object> attributes;

	public OAuth2UserInfo(final Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public abstract String getId(); // 소셜 식별하는 값, 구글-sub, 카카오-id

	public abstract String getNickName();

	public abstract String getImageUrl();

	public abstract String getEmail();

}
