package org.a602.gotcha.domain.service;

import org.a602.gotcha.domain.member.Member;
import org.a602.gotcha.domain.member.MemberRepository;
import org.a602.gotcha.domain.member.MemberService;
import org.a602.gotcha.domain.member.MemberSignupRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberServiceTest {

	@Autowired
	private MemberService memberService;
	@Autowired
	private MemberRepository memberRepository;

	@Nested
	@DisplayName("회원가입")
	class signupMember{
		@Test
		@DisplayName("회원가입 DB 저장 테스트")
		void signupSaveTest() {
			final MemberSignupRequest memberSignupRequest = new MemberSignupRequest(
				"user1",
				"1234",
				"ssafy",
				"asdf1@naver.com",
				"일반"
			);

			final Member originalMember = memberSignupRequest.toEntity();
			final Member afterMember = memberRepository.save(originalMember);

			Assertions.assertThat(originalMember).isEqualTo(afterMember);
		}

		@Test
		@DisplayName("회원가입 닉네임 중복확인 테스트")
		void signupNickNameDuplicateTest() {
			final MemberSignupRequest memberSignupRequest1 = new MemberSignupRequest(
				"user2",
				"1234",
				"ssafy",
				"asdf2@naver.com",
				"일반"
			);

			memberService.signup(memberSignupRequest1);

			final MemberSignupRequest memberSignupRequest2 = new MemberSignupRequest(
				"user2",
				"1234",
				"ssafy",
				"asdf3@naver.com",
				"일반"
			);

			final Boolean duplicateNickname = memberService.isDuplicateNickname(memberSignupRequest2.getNickname());

			Assertions.assertThat(true).isEqualTo(duplicateNickname);
		}

		@Test
		@DisplayName("회원가입 이메일 중복확인 테스트")
		void signupEmailDuplicateTest() {
			final MemberSignupRequest memberSignupRequest1 = new MemberSignupRequest(
				"user2",
				"1234",
				"ssafy",
				"asdf2@naver.com",
				"일반"
			);

			memberService.signup(memberSignupRequest1);

			final MemberSignupRequest memberSignupRequest2 = new MemberSignupRequest(
				"user3",
				"1234",
				"ssafy",
				"asdf2@naver.com",
				"일반"
			);

			final Boolean duplicateEmail = memberService.isDuplicateEmail(memberSignupRequest2.getEmail());

			Assertions.assertThat(true).isEqualTo(duplicateEmail);
		}

	}

}
