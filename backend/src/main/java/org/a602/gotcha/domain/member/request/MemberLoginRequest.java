package org.a602.gotcha.domain.member.request;

import javax.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(staticName = "of")
public final class MemberLoginRequest {
    @NotNull
    @Schema(description = "이메일")
    private final String email;
    @NotNull
    @Schema(description = "비밀번호")
    private final String password;
}
