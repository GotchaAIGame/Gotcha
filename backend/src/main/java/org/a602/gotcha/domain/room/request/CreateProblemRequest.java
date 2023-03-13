package org.a602.gotcha.domain.room.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Schema(description = "문제 만드는 요청")
public class CreateProblemRequest {

    @Schema(description = "Base64 인코딩된 이미지")
    String image;

    @Schema(description = "문제 이름")
    String name;

    @Schema(description = "문제 설명")
    String description;

    @Schema(description = "힌트")
    String hint;
}
