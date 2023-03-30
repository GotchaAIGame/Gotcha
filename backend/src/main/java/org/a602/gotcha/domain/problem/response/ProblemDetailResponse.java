package org.a602.gotcha.domain.problem.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProblemDetailResponse {
    private String hint;
    private String imageUrl;
    private String name;
    private Long id;

}
