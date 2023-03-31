package org.a602.gotcha.domain.member.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
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

	private final Long memberId = 1L;
	private final String nickname = "싸피";
	private final String organization = "SSAFY";
	private final String email = "ssafy@ssafy.com";
	private final String registrationId = "NORMAL";
	private final String profileImage = "url";
	private final String password = "1234";

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
	@DisplayName("findMemberInformationTest는 회원이 없을경우 NoSuchElement 예외발생")
	void findMemberInformationTest() {
		//given
		final Long memberId = 19L;
		//when
		when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
		//then
		assertThrows(NoSuchElementException.class, () -> memberService.findMemberInformation(memberId));
	}

	@Nested
	@DisplayName("updateMember 메소드")
	class updateMemberInformationTest {
		@Test
		@DisplayName("회원이 없을경우 NoSuchElement 예외발생")
		void notFindMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
			//then
			assertThrows(NoSuchElementException.class, () -> memberService.findMemberInformation(memberId));
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
				registrationId,
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
	@DisplayName("deleteMember 메소드")
	class deleteMemberByIdTest {
		@Test
		@DisplayName("삭제하려는 회원이 없을경우 NoSuchElement 예외발생")
		void notFindMember() {
			//when
			when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
			//then
			assertThrows(NoSuchElementException.class, () -> memberService.findMemberInformation(memberId));
		}

		@Test
		@DisplayName("회원삭제")
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

}
