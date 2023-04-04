package org.a602.gotcha.domain.participant.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "(출제자용) 모든 참여자의 랭킹 정보 응답")
public class AllRankListResponse {

    @Schema(description = "등수")
    private int grade;

    @Schema(description = "유저 이름")
    private String nickname;

    @Schema(description = "소요 시간")
    private String duration;

    @Schema(description = "푼 문제")
    private Integer solvedCnt;

    @Schema(description = "휴대폰 번호")
    private String phoneNumber;

}
