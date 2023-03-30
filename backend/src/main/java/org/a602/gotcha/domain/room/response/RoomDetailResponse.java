package org.a602.gotcha.domain.room.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * A DTO for the {@link org.a602.gotcha.domain.room.entity.Room} entity
 */
@Data
public class RoomDetailResponse {
    private final Long id;
    private final String color;
    private final String logoUrl;
    private final String title;
    private final String eventUrl;
    private final String eventDesc;
    private final int code;
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final Boolean hasReward;
    private final String rewardDesc;
    private final List<RewardDto> rewards;
    private final Set<ProblemDto> problems;

    /**
     * A DTO for the {@link org.a602.gotcha.domain.reward.entity.Reward} entity
     */
    @Data
    public static class RewardDto {
        private final Long id;
        private final String name;
        private final Integer grade;
        private final String image;
    }

    /**
     * A DTO for the {@link org.a602.gotcha.domain.problem.entity.Problem} entity
     */
    @Data
    public static class ProblemDto {
        private final Long id;
        private final String name;
        private final String description;
        private final String hint;
        private final String imageUrl;
    }
}