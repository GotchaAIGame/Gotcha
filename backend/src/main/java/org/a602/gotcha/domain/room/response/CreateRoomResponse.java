package org.a602.gotcha.domain.room.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomResponse {
    private int code;
    private Long id;

    public static CreateRoomResponse toResponse(Room room) {
        return CreateRoomResponse.builder()
                .id(room.getId())
                .code(room.getCode())
                .build();
    }
}
