package org.a602.gotcha.domain.room.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Schema(description = "방 닫는 요청")
public class CloseRoomRequest {

    @Schema(description = "방 ID")
    @Positive
    @NotNull
    private Long roomId;
}
