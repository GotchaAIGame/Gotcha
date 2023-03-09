package org.a602.gotcha.domain.reward.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SetRewardRequest {
    private List<RewardDTO> rewards;
    private Long roomId;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RewardDTO {
        private String name;
        private Integer grade;
    }
}

