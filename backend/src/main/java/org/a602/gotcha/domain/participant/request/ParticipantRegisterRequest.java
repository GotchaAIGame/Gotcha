package org.a602.gotcha.domain.participant.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "참여자 등록 요청")
public class ParticipantRegisterRequest {

    @NotNull
    @Positive
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotBlank
    @Schema(description = "유저 닉네임")
    private String nickname;

    @NotNull
    @Schema(description = "비밀번호")
    private Integer password;

}
