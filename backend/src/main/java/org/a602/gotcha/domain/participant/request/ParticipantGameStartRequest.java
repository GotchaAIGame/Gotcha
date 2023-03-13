package org.a602.gotcha.domain.participant.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "신규 게임 시작 요청")
public class ParticipantGameStartRequest {

    @NotNull
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotNull
    @Schema(description = "닉네임")
    private String nickname;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "시작 날짜와 시간(yyyy-MM-dd'T'HH:mm:ss)")
    private LocalDateTime startTime;

}
