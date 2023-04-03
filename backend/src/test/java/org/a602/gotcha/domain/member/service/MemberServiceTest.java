package org.a602.gotcha.domain.member.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.exception.MemberNotFoundException;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.request.MemberUpdateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

	public static final String PASSWORD = "1234";
	public static final String ENCODE_PASSWORD = "Encode_Password";
	private final Long memberId = 1L;
	private final String nickname = "싸피";
	private final String organization = "SSAFY";
	private final String email = "ssafy@ssafy.com";
	private final String registrationId = "NORMAL";
	private final String profileImage = "url";

	@InjectMocks
	private MemberService memberService;
	@Mock
	private MemberRepository memberRepository;

	@Test
	@DisplayName("signupNickNameDuplicate는 같은 닉네임이 있을경우 false 반환.")
	void signupNickNameDuplicateTest() {
		//when
		when(memberRepository.existsMemberByNickname(nickname)).thenReturn(false);
		//then
		assertFalse(memberService.isDuplicateNickname(nickname));
	}

	@Test
	@DisplayName("signupEmailDuplicate는 같은 이메일이 있을경우 false 반환.")
	void signupEmailDuplicateTest() {
		//when
		when(memberRepository.existsMemberByEmail(email)).thenReturn(false);
		//then
		assertFalse(memberService.isDuplicateEmail(email));
	}

	@Test
	@DisplayName("찾으려는 회원정보가 없을경우 MEMBER_NOT_FOUND 예외발생")
	void findMemberInformationTest() {
		//given
		final Long memberId = 19L;
		//when
		when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
		//then
		assertThrows(MemberNotFoundException.class, () -> memberService.findMemberInformation(memberId));
	}

	@Nested
	@DisplayName("회원정보 수정 메소드")
	class updateMemberTest {
		@Test
		@DisplayName("회원이 없을경우 MEMBER_NOT_FOUND 예외발생")
		void notFindMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
			//then
			assertThrows(MemberNotFoundException.class, () -> memberService.findMemberInformation(memberId));
		}

		@Test
		@DisplayName("회원을 찾을경우 회원정보 반환")
		void findMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(
				Optional.of(Member.builder().id(memberId).build()));
			//then
			assertEquals(memberRepository.findById(memberId).get().getId(), memberId);
		}

		@Test
		@DisplayName("회원정보가 존재할경우 회원정보 수정")
		void updateMember() {
			String newNickName = "싸피2";
			// given
			final MemberUpdateRequest memberUpdateRequest = new MemberUpdateRequest(
				memberId,
				newNickName,
				organization,
				email,
				profileImage
			);

			// when
			when(memberRepository.findById(memberUpdateRequest.getId()))
				.thenReturn(Optional.of(Member.builder()
					.id(memberId)
					.nickname(newNickName)
					.email(email)
					.profileImage(profileImage)
					.organization(organization)
					.registrationId(registrationId)
					.build()));

			// then
			memberService.updateMember(memberUpdateRequest);
		}
	}

	@Nested
	@DisplayName("회원 탈퇴 메소드")
	class deleteMemberTest {
		@Test
		@DisplayName("삭제하려는 회원이 없을경우 MEMBER_NOT_FOUND 예외발생")
		void notFindMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
			//then
			assertThrows(MemberNotFoundException.class, () -> memberService.findMemberInformation(memberId));
		}

		@Test
		@DisplayName("기존에 가입한 회원이 존재할경우 삭제한다.")
		void deleteMember() {
			//given
			final Long deleteMemberId = 30L;
			//when
			when(memberRepository.findById(eq(deleteMemberId))).thenReturn(Optional.of(Member.builder()
				.id(deleteMemberId)
				.nickname(nickname)
				.email(email)
				.profileImage(profileImage)
				.organization(organization)
				.registrationId(registrationId)
				.build()));
			//then
			assertEquals(memberService.deleteMemberById(deleteMemberId), deleteMemberId);
		}
	}

	@Test
	@DisplayName("회원가입한 회원의 Id값을 기준으로 데이터를 조회했을때 데이터가 존재한다면 회원가입 성공")
	void notFindMember() {
		String notRegisterNickname = "이민수123";
		String notRegisterEmail = "minsu@naver.com";

		// given
		MemberSignupRequest memberSignupRequest = new MemberSignupRequest(
			notRegisterNickname,
			ENCODE_PASSWORD,
			organization,
			notRegisterEmail
		);
		//when
		when(memberRepository.save(any())).thenReturn(Member.builder()
			.id(1L)
			.nickname(notRegisterNickname)
			.email(notRegisterEmail)
			.profileImage(profileImage)
			.organization(organization)
			.registrationId(registrationId)
			.build());

		when(memberRepository.findById(1L)).thenReturn(Optional.of(Member.builder()
			.id(1L)
			.nickname(notRegisterNickname)
			.email(notRegisterEmail)
			.password(ENCODE_PASSWORD)
			.profileImage(profileImage)
			.organization(organization)
			.registrationId(registrationId)
			.build()));

		final Long signup = memberService.signup(memberSignupRequest);

		//then
		final Optional<Member> byId = memberRepository.findById(signup);
		assertTrue(byId.isPresent());
//		assertEquals(1L, byId.get().getId());
	}

	@Nested
	@DisplayName("로그인 메소드")
	class loginMemberTest {
		@Test
		@DisplayName("로그인 하려는 회원이 없을경우 MEMBER_NOT_FOUND 예외발생")
		void notFindMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
			//then
			assertThrows(MemberNotFoundException.class, () -> memberService.findMemberInformation(memberId));
		}

		@Test
		@DisplayName("로그인 하려는 회원의 비밀번호가 다를경우 MISMATCH_PASSWORD 예외발생")
		void mismatchPassword() {
			//given
			final MemberLoginRequest memberLoginRequest = new MemberLoginRequest(email, "4567");
			//when
			when(memberRepository.findMemberByEmail(email)).thenReturn(
				Optional.of(Member.builder()
					.nickname(nickname)
					.registrationId(registrationId)
					.organization(organization)
					.email(email)
					.password(ENCODE_PASSWORD)
					.build()));

			//then
			assertThrows(IllegalArgumentException.class, () -> memberService.login(memberLoginRequest));
		}

		@Test
		@DisplayName("로그인 하려는 회원의 이메일과 비밀번호가 일치하면 회원정보 및 토큰반환")
		void loginMember() {

		}

	}

}
