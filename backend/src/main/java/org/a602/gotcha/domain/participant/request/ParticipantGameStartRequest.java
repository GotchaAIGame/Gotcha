package org.a602.gotcha.domain.participant.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Builder
@JsonDeserialize(builder = ParticipantGameStartRequest.ParticipantGameStartRequestBuilder.class)
@Getter
@Schema(description = "신규 게임 시작 요청")
public class ParticipantGameStartRequest {

    @NotNull
    @Positive
    @JsonProperty("roomId")
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotBlank
    @JsonProperty("nickname")
    @Schema(description = "닉네임")
    private String nickname;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @JsonProperty("startTime")
    @Schema(description = "시작 날짜와 시간(yyyy-MM-dd'T'HH:mm:ss)")
    private LocalDateTime startTime;

}
