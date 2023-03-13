package org.a602.gotcha.domain.room.request;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CreateRoomRequest {

    @Schema(description = "브랜드 색상")
    String brandColor;
    @Schema(description = "로고 url")
    String logoUrl;

    @Schema(description = "방 제목")
    String title;

    @Schema(description = "이벤트 url")
    String eventUrl;

    @Schema(description = "설명")
    String description;

    @Schema(description = "리워드가 있는지")
    boolean hasReward;


    @Schema(description = "게임 시작 시간")
    LocalDateTime startTime;

    @Schema(description = "끝나는 시간")
    LocalDateTime endTime;

    @Schema(description = "문제들")
    List<CreateProblemRequest> problems;

}
