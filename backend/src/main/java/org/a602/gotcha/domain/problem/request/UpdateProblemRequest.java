package org.a602.gotcha.domain.problem.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateProblemRequest {

    @Schema(description = "Base64 인코딩된 이미지")
    private String image;

    @Schema(description = "이름")
    private String name;

    @Schema(description = "설명")
    private String description;

    @Schema(description = "힌트")
    private String hint;

    @Schema(description = "문제 Id")
    private Long problemId;

}
