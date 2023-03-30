package org.a602.gotcha.global.security.oauth;

public enum SocialType {
	KAKAO("KAKAO"),
	GOOGLE("GOOGLE");

	private final String socialType;

	SocialType(final String socialType) {
		this.socialType = socialType;
	}

	public String getSocialType() {
		return socialType;
	}

}
