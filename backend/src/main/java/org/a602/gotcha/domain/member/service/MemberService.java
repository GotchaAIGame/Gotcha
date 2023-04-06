package org.a602.gotcha.domain.member.service;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.exception.MemberNotFoundException;
import org.a602.gotcha.domain.member.exception.PasswordMismatchException;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.member.request.MemberLoginRequest;
import org.a602.gotcha.domain.member.request.MemberLogoutRequest;
import org.a602.gotcha.domain.member.request.MemberSignupRequest;
import org.a602.gotcha.domain.member.request.MemberSocialLoginRequest;
import org.a602.gotcha.domain.member.request.MemberUpdateRequest;
import org.a602.gotcha.domain.member.request.ReCreateAccessTokenRequest;
import org.a602.gotcha.domain.member.response.MemberInformationResponse;
import org.a602.gotcha.domain.member.response.MemberLoginResponse;
import org.a602.gotcha.domain.member.response.MemberUpdateResponse;
import org.a602.gotcha.global.common.S3Service;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.a602.gotcha.global.security.jwt.JwtTokenProvider.BEARER;

@Service
@RequiredArgsConstructor
public class MemberService {
    public static final String PROFILE_IMAGE = "profileImage";
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3Service s3Service;

    @Transactional
    public Long signup(final MemberSignupRequest memberSignupRequest) {
        final Member member = memberRepository.save(memberSignupRequest.toEntity());
        member.encodePassword(passwordEncoder);
        member.insertDefaultRegistrationId();
        member.insertDefaultImage();

        return member.getId();
    }

    public Boolean isDuplicateNickname(final String nickname) {
        return memberRepository.existsMemberByNickname(nickname);
    }

    public Boolean isDuplicateEmail(final String email) {
        return memberRepository.existsMemberByEmail(email);
    }

    @Transactional(readOnly = true)
    public MemberLoginResponse login(final MemberLoginRequest memberLoginRequest) {
        final Member member = memberRepository.findMemberByEmail(memberLoginRequest.getEmail())
                .orElseThrow(MemberNotFoundException::new);

        String accessToken;
        String refreshToken;

        if (passwordEncoder.matches(memberLoginRequest.getPassword(), member.getPassword())) {
            accessToken = jwtTokenProvider.createAccessToken(member);
            refreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());
        } else {
            throw new PasswordMismatchException();
        }

        return new MemberLoginResponse(member, BEARER + accessToken, BEARER + refreshToken);
    }

    @Transactional(readOnly = true)
    public MemberLoginResponse socialLogin(final MemberSocialLoginRequest memberSocialLoginRequest) {
        final Authentication authentication = jwtTokenProvider.getAuthentication(
                memberSocialLoginRequest.getAccessToken());
        final Member member = memberRepository.findMemberByEmailAndRegistrationId(authentication.getName(),
                        memberSocialLoginRequest.getRegistrationId())
                .orElseThrow(MemberNotFoundException::new);

        final String accessToken = jwtTokenProvider.createAccessToken(member);
        final String refreshToken = jwtTokenProvider.createRefreshToken(accessToken, member.getEmail());

        return new MemberLoginResponse(member, BEARER + accessToken, BEARER + refreshToken);
    }

    @Transactional(readOnly = true)
    public String reCreateToken(final ReCreateAccessTokenRequest reCreateAccessTokenRequest) {
        final Member member = memberRepository.findMemberByEmail(reCreateAccessTokenRequest.getEmail())
                .orElseThrow(MemberNotFoundException::new);
        final String refreshToken = jwtTokenProvider.splitToken(reCreateAccessTokenRequest.getRefreshToken());

        return BEARER + jwtTokenProvider.reCreateAccessToken(refreshToken, member);
    }

    public String logout(final MemberLogoutRequest memberLogoutRequest) {
        // logout유저가 새로 로그인 할 시 토큰을 새로 만들어서 로그인.
        // 기존 logout처리했던 토큰은 유효시간 지나면 자동으로 삭제됌.
        return jwtTokenProvider.registerLogoutUser(memberLogoutRequest)
                .orElseThrow(() -> new AccessDeniedException(GlobalErrorCode.ACCESS_DENIED.getMessage()));
    }

    @Transactional(readOnly = true)
    public MemberInformationResponse findMemberInformation(final Long id) {
        final Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);

        return new MemberInformationResponse(member);
    }

    @Transactional
    public Long deleteMemberById(final Long id) {
        final Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);
        memberRepository.deleteById(member.getId());

        return id;
    }

    @Transactional
    public MemberUpdateResponse updateMember(final MemberUpdateRequest memberUpdateRequest) {
        final Member member = memberRepository.findById(memberUpdateRequest.getId())
                .orElseThrow(MemberNotFoundException::new);

        String uploadImageUrl = null;

        if (memberUpdateRequest.getProfileImage() != null) {
            if (!Objects.equals(memberUpdateRequest.getProfileImage(), member.getProfileImage())) {
                String fileName = System.currentTimeMillis() + PROFILE_IMAGE + memberUpdateRequest.getNickname();
                uploadImageUrl = s3Service.uploadImage(memberUpdateRequest.getProfileImage(), fileName);
            }
        }

        member.updateMember(memberUpdateRequest.toEntity(), uploadImageUrl);

        return new MemberUpdateResponse(member);
    }

}
