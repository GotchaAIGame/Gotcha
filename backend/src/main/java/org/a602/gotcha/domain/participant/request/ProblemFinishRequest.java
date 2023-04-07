package org.a602.gotcha.domain.participant.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "문제 풀이 완료 요청")
public class ProblemFinishRequest {

    @NotNull
    @Positive
    @Schema(description = "게임 방 Id")
    private Long roomId;

    @NotBlank
    @Schema(description = "유저 닉네임")
    private String nickname;

    @NotNull
    @Schema(description = "문제 풀이 개수")
    private Integer solvedCnt;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "종료 날짜와 시간(yyyy-MM-dd'T'HH:mm:ss)")
    private LocalDateTime endTime;


}
