package org.a602.gotcha.domain.member.service;

import java.util.ArrayList;
import java.util.List;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.exception.MemberNotFoundException;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
		final Member member = memberRepository.findMemberByEmail(email)
			.orElseThrow(MemberNotFoundException::new);

		final List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

		return member;
	}

}
