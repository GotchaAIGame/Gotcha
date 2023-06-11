package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor(staticName = "of")
public final class MemberLogoutRequest {
    @NotNull
    @Schema(description = "Access 토큰")
    private final String accessToken;
    @NotNull
    @Schema(description = "Refresh 토큰")
    private final String refreshToken;
}
