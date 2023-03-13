package org.a602.gotcha.domain.problem.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DeleteProblemRequest {
    private Long problemId;
}
