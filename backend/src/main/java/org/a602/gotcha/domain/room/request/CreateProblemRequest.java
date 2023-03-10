package org.a602.gotcha.domain.room.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CreateProblemRequest {
    String image;
    String name;
    String description;
    String hint;
}
