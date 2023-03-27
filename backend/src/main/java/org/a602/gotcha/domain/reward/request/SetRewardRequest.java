package org.a602.gotcha.domain.reward.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SetRewardRequest {
    @Valid
    private List<RewardDTO> rewards;
    private Long roomId;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RewardDTO {
        @NotBlank
        private String name;
        @Positive
        @NotNull
        private Integer grade;


        private String image;
    }
}

