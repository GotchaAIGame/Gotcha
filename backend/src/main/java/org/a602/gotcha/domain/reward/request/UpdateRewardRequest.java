package org.a602.gotcha.domain.reward.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateRewardRequest {
    private List<UpdateRewardDTO> rewards;
    @NotNull
    private Long roomId;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateRewardDTO {
        private Long rewardId;
        @NotBlank
        private String name;
        @Positive
        @NotNull
        private Integer grade;
        private String image;

    }
}
