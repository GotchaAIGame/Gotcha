package org.a602.gotcha.domain.room.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.a602.gotcha.domain.room.entity.Room;

import java.time.LocalDateTime;

/**
 * A Projection for the {@link Room} entity
 */
@Getter
@Setter
@AllArgsConstructor
public class RoomSummaryInfo {
    private Long id;
    private String logoUrl;
    private String eventDesc;
    private Integer code;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String title;


    private Integer problemCount;

    // getters and setters
}
