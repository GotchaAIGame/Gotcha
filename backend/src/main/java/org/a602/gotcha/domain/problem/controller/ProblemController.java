package org.a602.gotcha.domain.problem.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.problem.service.ProblemService;
import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Participant", description = "게임 참여자 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
public class ProblemController {

    private final ProblemService problemService;

    @Operation(description = "힌트 확인하기", summary = "힌트 확인하기")
    @ApiResponse(responseCode = "200", description = "힌트 확인 성공")
    @ApiResponse(responseCode = "404", description = "문제 확인할 수 없음")
    @GetMapping("/hint")
    public BaseResponse<String> getProblemHint(@RequestParam Long problemId) {
        String hint = problemService.findHint(problemId);
        return new BaseResponse<>(hint);
    }

}
