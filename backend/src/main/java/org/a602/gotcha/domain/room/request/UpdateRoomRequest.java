package org.a602.gotcha.domain.room.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateRoomRequest {
    @NotNull
    @Positive
    private Long roomId;

    @Schema(description = "브랜드 색상")
    @NotBlank
    String color;

    @Schema(description = "base64로 인코딩된 로고 이미지")
    String logoImage;

    @Schema(description = "방 제목")
    @NotBlank
    String title;

    @Schema(description = "이벤트 url")
    String eventUrl;

    @Schema(description = "이벤트 설명")
    @NotBlank
    String eventDesc;

    @Schema(description = "리워드가 있는지")
    boolean hasReward;

    @Schema(description = "게임 시작 시간")
    @NotNull
    LocalDateTime startTime;

    @Schema(description = "끝나는 시간")
    @NotNull
    LocalDateTime endTime;

}