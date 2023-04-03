package org.a602.gotcha.domain.room.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "게임 방 정보 접속 후 응답")
public class GameInfoResponse {

    @Schema(description = "게임방 Id")
    private Long roomId;

    @Schema(description = "브랜드 색상")
    private String color;

    @Schema(description = "로고 이미지 URL")
    private String logoUrl;

    @Schema(description = "이벤트 제목")
    private String title;

    @Schema(description = "리워드 존재 여부")
    private Boolean hasReward;

    public static GameInfoResponse toResponse(Room room) {

        return GameInfoResponse.builder()
                .roomId(room.getId())
                .color(room.getColor())
                .logoUrl(room.getLogoUrl())
                .title(room.getTitle())
                .hasReward(room.getHasReward())
                .build();
    }
}

