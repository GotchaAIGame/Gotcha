package org.a602.gotcha.domain.problem.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.problem.request.DeleteProblemRequest;
import org.a602.gotcha.domain.problem.request.UpdateProblemRequest;
import org.a602.gotcha.domain.problem.service.ProblemService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.problem.service.ProblemService;
import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Tag(name = "Participant", description = "게임 참여자 관련 API")
@Slf4j
public class ProblemController {
    private final ProblemService problemService;


    @PutMapping("/set/problem")
    @ApiResponse(responseCode = "200", description = "수정 성공")
    @Operation(description = "문제 수정 API", summary = "문제 수정 API")
    public BaseResponse<Void> updateProblem(@Valid @RequestBody UpdateProblemRequest request) {
        problemService.updateProblem(request);

        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @DeleteMapping("/set/problem")
    @ApiResponse(responseCode = "200", description = "삭제 성공")
    @Operation(description = "문제 삭제 API", summary = "문제 삭제 API")
    public BaseResponse<Void> deleteProblem(@Valid @RequestBody DeleteProblemRequest request) {
        problemService.deleteProblem(request.getProblemId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @Operation(description = "힌트 확인하기", summary = "힌트 확인하기")
    @ApiResponse(responseCode = "200", description = "힌트 확인 성공")
    @ApiResponse(responseCode = "404", description = "문제 확인할 수 없음")
    @GetMapping("/game/hint")
    public BaseResponse<String> getProblemHint(@RequestParam Long problemId) {
        String hint = problemService.findHint(problemId);
        return new BaseResponse<>(hint);
    }

}
