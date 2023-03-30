package org.a602.gotcha.domain.room.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@Getter
@AllArgsConstructor
@Schema(description = "문제 만드는 요청")
public class CreateProblemRequest {

    @Schema(description = "Base64 인코딩된 이미지")
    String image;

    @Schema(description = "문제 이름")
    @NotBlank
    String name;

    @Schema(description = "힌트")
    String hint;
}
