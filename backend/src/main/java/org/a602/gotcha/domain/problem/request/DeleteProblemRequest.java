package org.a602.gotcha.domain.problem.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DeleteProblemRequest {
    @Schema(description = "문제 Id")
    private Long problemId;
}
