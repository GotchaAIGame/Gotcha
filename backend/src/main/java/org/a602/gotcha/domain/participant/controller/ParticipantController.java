package org.a602.gotcha.domain.participant.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.participant.request.ParticipantCheckRequest;
import org.a602.gotcha.domain.participant.request.ParticipantGameStartRequest;
import org.a602.gotcha.domain.participant.request.RejoinGameRequest;
import org.a602.gotcha.domain.participant.response.ParticipantInfoResponse;
import org.a602.gotcha.domain.participant.service.ParticipantService;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.a602.gotcha.domain.problem.service.ProblemService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@Tag(name = "Participant", description = "게임 참여자 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
public class ParticipantController {

    private final ParticipantService participantService;
    private final ProblemService problemService;

    @Operation(description = "유저 신규 등록하기", summary = "유저 신규 등록하기")
    @ApiResponse(responseCode = "200", description = "유저 등록 성공")
    @ApiResponse(responseCode = "400", description = "중복된 닉네임 있음")
    @ApiResponse(responseCode = "404", description = "해당하는 방 존재하지 않음")
    @PostMapping("/register")
    public BaseResponse<Object> getParticipantInfo(@Valid ParticipantCheckRequest request) {
        participantService.registerUser(request);
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @Operation(description = "기존 참여자 접속하기", summary = "기존 참여자 접속하기")
    @ApiResponse(responseCode = "200", description = "참여자 정보 확인 성공")
    @ApiResponse(responseCode = "401", description = "참여자 정보 일치하지 않음")
    @ApiResponse(responseCode = "404", description = "해당하는 방 존재하지 않음")
    @ApiResponse(responseCode = "")
    @PostMapping("/login")
    public BaseResponse<ParticipantInfoResponse> doLogin(@Valid ParticipantCheckRequest request) {
        ParticipantInfoResponse response = participantService.getUserInfo(request);
        return new BaseResponse<>(response);
    }

    @Operation(description = "게임 신규로 시작하기", summary = "게임 신규로 시작하기")
    @ApiResponse(responseCode = "200", description = "게임 신규 시작 성공")
    @ApiResponse(responseCode = "404", description = "해당하는 방 없음")
    @ApiResponse(responseCode = "404", description = "해당하는 유저 없음")
    @ApiResponse(responseCode = "404", description = "해당하는 문제 없음")
    @PostMapping("/start")
    public BaseResponse<List<ProblemListResponse>> newGameStart(@Valid ParticipantGameStartRequest request) {
        // 유저 유효성 체크 및 시작 시간 추가
        participantService.updateStartTime(request);
        // 문제 탐색
        List<ProblemListResponse> problemList = problemService.getProblemList(request.getRoomId());
        return new BaseResponse<>(problemList);
    }

    @Operation(description = "게임 재참여하기", summary = "게임 재참여하기")
    @ApiResponse(responseCode = "200", description = "게임 재참여 성공")
    @ApiResponse(responseCode = "404", description = "해당하는 방 없음")
    @ApiResponse(responseCode = "404", description = "해당하는 유저 없음")
    @ApiResponse(responseCode = "404", description = "해당하는 문제 없음")
    @PostMapping("/rejoin")
    public BaseResponse<List<ProblemListResponse>> rejoinGame(@Valid RejoinGameRequest request) {
        // 유저 유효성 체크
        participantService.checkUserValidation(request.getRoomId(), request.getNickname());
        // 문제 탐색
        List<ProblemListResponse> problemList = problemService.getProblemList(request.getRoomId());
        return new BaseResponse<>(problemList);
    }

}
