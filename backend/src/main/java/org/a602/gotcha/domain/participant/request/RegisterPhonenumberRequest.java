package org.a602.gotcha.domain.participant.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Builder
@JsonDeserialize(builder = RegisterPhonenumberRequest.RegisterPhonenumberRequestBuilder.class)
@Getter
@Schema(description = "휴대폰 번호 등록 요청")
public class RegisterPhonenumberRequest {

    @NotNull
    @Positive
    @JsonProperty("roomId")
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotBlank
    @JsonProperty("nickname")
    @Schema(description = "유저 닉네임")
    private String nickname;

    @NotBlank
    @JsonProperty("phoneNumber")
    @Schema(description = "휴대폰 번호")
    private String phoneNumber;

}
