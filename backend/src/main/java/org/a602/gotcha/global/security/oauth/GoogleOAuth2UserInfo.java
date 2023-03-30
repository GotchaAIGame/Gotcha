package org.a602.gotcha.global.security.oauth;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

	public static final String PROVIDER_KEY = "sub";
	public static final String NAME_KEY = "name";
	public static final String PICTURE = "picture";
	public static final String EMAIL = "email";

	public GoogleOAuth2UserInfo(final Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return (String)attributes.get(PROVIDER_KEY);
	}

	@Override
	public String getNickName() {
		return (String)attributes.get(NAME_KEY);
	}

	@Override
	public String getImageUrl() {
		return (String)attributes.get(PICTURE);
	}

	@Override
	public String getEmail() {
		return (String)attributes.get(EMAIL);
	}

}
