package org.a602.gotcha.domain.participant.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "기존 참여자 정보 응답")
public class ParticipantInfoResponse {

    @Schema(description = "문제 풀이 완료 여부")
    private Boolean isFinished;

    @Schema(description = "문제 시작 시간")
    private LocalDateTime startTime;

}
