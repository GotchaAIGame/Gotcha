package org.a602.gotcha.domain.room.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateRoomRequest {
    @NotNull
    @Positive
    private Long id;
    @NotBlank
    private String color;
    @NotBlank
    private String logoUrl;
    @NotBlank
    private String title;
    @NotBlank

    private String eventUrl;
    @NotBlank

    private String eventDesc;
    @NotNull
    private LocalDateTime startTime;
    @NotNull

    private LocalDateTime endTime;
}