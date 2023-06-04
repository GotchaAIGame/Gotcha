package org.a602.gotcha.domain.member.service;

import java.util.Optional;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.exception.MemberNotFoundException;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {
    public static final String PROFILE_IMAGE = "https://a602gotcha.s3.ap-northeast-2.amazonaws.com/basic_profile.png";
    public static final String RAW_PASSWORD = "1234";
    private final Long memberId = 1L;
    private final String nickname = "싸피";
    private final String organization = "ssafy";
    private final String email = "minsu@naver.com";
    private final String accessToken = "accessToken";

    @InjectMocks
    private MemberService memberService;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("닉네임 중복검사 메서드는 같은 닉네임이 없을경우 false 반환.")
    void noDuplicateNickName() {
        //when
        when(memberRepository.existsMemberByNickname(nickname)).thenReturn(false);
        //then
        assertFalse(memberService.isDuplicateNickname(nickname));
    }

    @Test
    @DisplayName("이메일 중복검사 메서드는 같은 이메일이 없을경우 false 반환.")
    void noDuplicateEmail() {
        //when
        when(memberRepository.existsMemberByEmail(email)).thenReturn(false);
        //then
        assertFalse(memberService.isDuplicateEmail(email));
    }

    @Nested
    @DisplayName("회원정보 조회 메서드")
    class findMemberTest {
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
        @DisplayName("찾으려는 회원정보가 없을경우 MEMBER_NOT_FOUND 예외발생")
        void notFindMember() {
            //given
            final Long memberId = 19L;
            //when
            when(memberRepository.findById(eq(memberId))).thenReturn(Optional.empty());
            //then
            assertThrows(MemberNotFoundException.class, () -> memberService.findMemberInformation(memberId));
        }
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
        @DisplayName("회원을 찾을경우 회원정보 반환")
        void findMember() {
            //when
            when(memberRepository.findById(eq(memberId))).thenReturn(
                    Optional.of(Member.builder().id(memberId).build()));
            //then
            assertEquals(memberRepository.findById(memberId).get().getId(), memberId);
        }

        @Test
        @DisplayName("기존에 가입한 회원이 존재할경우 삭제")
        void deleteMember() {
            //given
            final Long deleteMemberId = 30L;
            //when
            String registrationId = "NORMAL";
            when(memberRepository.findById(eq(deleteMemberId))).thenReturn(Optional.of(Member.builder()
                    .id(deleteMemberId)
                    .nickname(nickname)
                    .email(email)
                    .profileImage(PROFILE_IMAGE)
                    .organization(organization)
                    .registrationId(registrationId)
                    .build()));
            //then
            assertEquals(memberService.deleteMemberById(deleteMemberId), deleteMemberId);
        }
    }

    @Nested
    @DisplayName("로그인 메소드")
    class loginMemberTest {
        @Test
        @DisplayName("회원이 없을경우 MEMBER_NOT_FOUND 예외발생")
        void notFindMember() {
            //given
            final String noExistEmail = "nono@nono.com";
            //when
            when(memberRepository.findMemberByEmail(eq(noExistEmail))).thenReturn(Optional.empty());
            //then
            assertThrows(MemberNotFoundException.class, () -> memberRepository.findMemberByEmail(noExistEmail).orElseThrow(MemberNotFoundException::new));
        }

        @Test
        @DisplayName("회원을 찾을경우 회원정보 반환")
        void findMember() {
            // given
            MemberLoginRequest loginRequest = MemberLoginRequest.of(email, RAW_PASSWORD);
            //when
            when(memberRepository.findMemberByEmail(eq(email))).thenReturn(
                    Optional.of(Member.builder().id(memberId).email(email).build()));
            Optional<Member> byId = memberRepository.findMemberByEmail(email);
            //then
            assertEquals(loginRequest.getEmail(), byId.get().getEmail());
        }

        @Test
        @DisplayName("비밀번호 불일치시 false 반환")
        void mismatchPassword() {
            //given
            String mismatchPassword = "4567";
            //when
            when(memberRepository.findById(eq(memberId))).thenReturn(
                    Optional.of(Member.builder().id(memberId).email(email).password(RAW_PASSWORD).build()));
            //then
            Optional<Member> byId = memberRepository.findById(memberId);
            assertFalse(passwordEncoder.matches(mismatchPassword, byId.get().getPassword()));
        }

        @Test
        @DisplayName("로그인 성공시 accesstoken refreshtoken 반환")
        void login() {
            //given
            Member member = Member.builder().email(email).password(RAW_PASSWORD).nickname(nickname).organization(organization).build();
            //when
            when(jwtTokenProvider.createAccessToken(member)).thenReturn(accessToken);
            String refreshToken = "refreshToken";
            when(jwtTokenProvider.createRefreshToken(accessToken, member.getEmail())).thenReturn(refreshToken);

            String newAccessToken = jwtTokenProvider.createAccessToken(member);
            String newRefreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());
            //then
            assertEquals(accessToken, newAccessToken);
            assertEquals(refreshToken, newRefreshToken);
        }
    }

    @Nested
    @DisplayName("토큰 재발급 메소드")
    class reCreateTokenTest {
        @Test
        @DisplayName("회원이 없을경우 MEMBER_NOT_FOUND 예외발생")
        void notFindMember() {
            //given
            final String noExistEmail = "nono@nono.com";
            //when
            when(memberRepository.findMemberByEmail(eq(noExistEmail))).thenReturn(Optional.empty());
            //then
            assertThrows(MemberNotFoundException.class, () -> memberRepository.findMemberByEmail(noExistEmail).orElseThrow(MemberNotFoundException::new));
        }

        @Test
        @DisplayName("회원을 찾을경우 회원정보 반환")
        void findMember() {
            // given
            MemberLoginRequest loginRequest = MemberLoginRequest.of(email, RAW_PASSWORD);
            //when
            when(memberRepository.findMemberByEmail(eq(email))).thenReturn(
                    Optional.of(Member.builder().id(memberId).email(email).build()));
            Optional<Member> byId = memberRepository.findMemberByEmail(email);
            //then
            assertEquals(loginRequest.getEmail(), byId.get().getEmail());
        }

        @Test
        @DisplayName("토큰 재발급 성공시 accesstoken 반환")
        void reCreateAccessToken() {
            //given
            Member member = Member.builder().email(email).password(RAW_PASSWORD).nickname(nickname).organization(organization).build();
            //when
            when(jwtTokenProvider.createAccessToken(member)).thenReturn(accessToken);

            String newAccessToken = jwtTokenProvider.createAccessToken(member);
            //then
            assertEquals(accessToken, newAccessToken);
        }
    }

}
