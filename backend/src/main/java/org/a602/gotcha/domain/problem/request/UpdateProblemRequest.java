package org.a602.gotcha.domain.problem.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateProblemRequest {

    @Schema(description = "Base64 인코딩된 이미지")
    private String image;

    @Schema(description = "이름")
    @NotBlank
    private String name;

    @Schema(description = "힌트")
    @NotBlank
    private String hint;

    @Schema(description = "문제 Id")
    @NotNull
    @Positive
    private Long problemId;

}
