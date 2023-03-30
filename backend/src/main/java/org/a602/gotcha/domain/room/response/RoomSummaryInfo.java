package org.a602.gotcha.domain.room.response;

import org.a602.gotcha.domain.room.entity.Room;

import java.time.LocalDateTime;

/**
 * A Projection for the {@link Room} entity
 */
public interface RoomSummaryInfo {
    Long getId();

    String getLogoUrl();

    String getEventDesc();

    Integer getCode();

    LocalDateTime getStartTime();

    LocalDateTime getEndTime();
}