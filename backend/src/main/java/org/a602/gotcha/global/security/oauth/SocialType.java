package org.a602.gotcha.global.security.oauth;

public enum SocialType {
	KAKAO("kakao"),
	GOOGLE("google");

	private final String socialType;

	SocialType(final String socialType) {
		this.socialType = socialType;
	}

	public String getSocialType() {
		return socialType;
	}

}
