package org.a602.gotcha.domain.room.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CloseRoomRequest {
    private Long roomId;
}
