package org.a602.gotcha.domain.room.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateRoomRequest {
    private Long id;
    private String color;
    private String logoUrl;
    private String title;
    private String eventUrl;
    private String eventDesc;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}