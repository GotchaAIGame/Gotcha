package org.a602.gotcha.domain.room.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.reward.entity.Reward;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "게임 리워드 정보 응답")
public class RewardListResponse {

    @Schema(description = "등수")
    private Integer grade;

    @Schema(description = "상품명")
    private String rewardName;

    @Schema(description = "이미지 URL")
    private String image;


    public static RewardListResponse toResponse(Reward reward) {
        return RewardListResponse.builder()
                .grade(reward.getGrade())
                .rewardName(reward.getName())
                .image(reward.getImage())
                .build();
    }
}
