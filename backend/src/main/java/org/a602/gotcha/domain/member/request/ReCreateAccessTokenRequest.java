package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(staticName = "of")
public final class ReCreateAccessTokenRequest {
    @NotNull
    @Schema(description = "Access 토큰")
    private final String accessToken;
    @NotNull
    @Schema(description = "가입경로")
    private final String refreshToken;
    @NotNull
    @Schema(description = "이메일")
    private final String email;
}
