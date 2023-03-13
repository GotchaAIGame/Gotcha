package org.a602.gotcha.domain.problem.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateProblemRequest {

    private String image;
    private String name;
    private String description;
    private String hint;

    private Long problemId;

}
