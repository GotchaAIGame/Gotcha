package org.a602.gotcha.domain.reward.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DeleteRewardRequest {

    @NotNull
    private Long roomId;

    @NotNull
    private Long rewardId;
}
