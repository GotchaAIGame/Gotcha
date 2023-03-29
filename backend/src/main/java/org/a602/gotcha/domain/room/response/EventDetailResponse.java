package org.a602.gotcha.domain.room.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "이벤트 상세 내용 응답")
public class EventDetailResponse {

    @Schema(description = "이벤트 내용 설명")
    private String eventDesc;

    @Schema(description = "이벤트 URL")
    private String eventUrl;

}
