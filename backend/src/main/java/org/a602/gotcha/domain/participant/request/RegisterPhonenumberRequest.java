package org.a602.gotcha.domain.participant.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "휴대폰 번호 등록 요청")
public class RegisterPhonenumberRequest {

    @NotNull
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotNull
    @Schema(description = "유저 닉네임")
    private String nickname;

    @NotNull
    @Schema(description = "휴대폰 번호")
    private String phoneNumber;

}
