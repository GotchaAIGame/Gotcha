package org.a602.gotcha.domain.problem.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.problem.entity.Problem;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "문제 리스트 응답")
public class ProblemListResponse {

    @Schema(description = "보물(문제) id")
    private Long problemId;

    @Schema(description = "보물(문제) 이름")
    private String problemName;

    @Schema(description = "보물(문제) 이미지 URL")
    private String problemImgURL;


    public static ProblemListResponse toResponse(Problem problem) {
        return ProblemListResponse.builder()
                .problemId(problem.getId())
                .problemName(problem.getName())
                .problemImgURL(problem.getImageUrl())
                .build();

    }

}
