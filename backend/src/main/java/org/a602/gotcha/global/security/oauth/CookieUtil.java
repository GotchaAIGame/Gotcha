package org.a602.gotcha.global.security.oauth;

import java.util.Base64;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.SerializationUtils;

public class CookieUtil {
	public static Optional<Cookie> getCookie(final HttpServletRequest httpServletRequest, String name) {
		final Cookie[] cookies = httpServletRequest.getCookies();

		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					return Optional.of(cookie);
				}
			}
		}

		return Optional.empty();
	}

	public static void addCookie(final HttpServletResponse httpServletResponse, final String name, final String value, final int maxAge) {
		final Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(maxAge);
		httpServletResponse.addCookie(cookie);
	}

	public static void deleteCookie(final HttpServletRequest httpServletRequest,
		final HttpServletResponse httpServletResponse, final String name) {
		final Cookie[] cookies = httpServletRequest.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					cookie.setValue("");
					cookie.setPath("/");
					cookie.setMaxAge(0);
					httpServletResponse.addCookie(cookie);
				}
			}
		}
	}

	public static String serialize(final Object object) {
		return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(object));
	}

	public static <T> T deserialize(final Cookie cookie, final Class<T> tClass) {
		return tClass.cast(SerializationUtils.deserialize(Base64.getUrlDecoder().decode(cookie.getValue())));
	}

}
