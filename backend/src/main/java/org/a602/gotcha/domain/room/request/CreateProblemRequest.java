package org.a602.gotcha.domain.room.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
@AllArgsConstructor
public class CreateProblemRequest {
    List<String> images;
    String name;
    String description;
    String hint;
}
