package org.a602.gotcha.domain.reward.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateRewardRequest {
    private List<UpdateRewardDTO> rewards;
    private Long roomId;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateRewardDTO {
        private Long rewardId;
        private String name;
        private Integer grade;
        private String image;

    }
}
