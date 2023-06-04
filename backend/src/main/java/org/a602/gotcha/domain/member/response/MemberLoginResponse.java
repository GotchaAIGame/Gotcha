package org.a602.gotcha.domain.member.response;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.a602.gotcha.domain.member.entity.Member;

@Getter
@Builder
public final class MemberLoginResponse {
    @NotNull
    @Schema(description = "회원 id")
    private final Long id;
    @NotNull
    @Schema(description = "닉네임")
    private final String nickname;
    @NotNull
    @Schema(description = "조직")
    private final String organization;
    @NotNull
    @Schema(description = "이메일")
    private final String email;
    @NotNull
    @Schema(description = "가입경로")
    private final String registrationId;
    @NotNull
    @Schema(description = "프로필 이미지")
    private final String profileImage;
    @NotNull
    @Schema(description = "Access 토큰")
    private final String accessToken;
    @NotNull
    @Schema(description = "Refresh 토큰")
    private final String refreshToken;

    public static MemberLoginResponse from(final Member member, final String accessToken, final String refreshToken) {
        return MemberLoginResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .organization(member.getOrganization())
                .registrationId(member.getRegistrationId())
                .profileImage(member.getProfileImage())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
