package org.a602.gotcha.domain.room.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CreateRoomRequest {
    String brandColor;
    String logoUrl;
    String title;
    String eventUrl;
    String description;
    boolean hasReward;

    LocalDateTime startTime;
    LocalDateTime endTime;

    List<CreateProblemRequest> problems;

}
