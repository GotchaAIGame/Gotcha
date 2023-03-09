package org.a602.gotcha.domain.member;

import java.util.NoSuchElementException;

import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {
		return memberRepository.findMemberByEmail(email)
			.orElseThrow(() -> new NoSuchElementException(GlobalErrorCode.EMAIL_NOT_FOUND.getMessage()));
	}

}
