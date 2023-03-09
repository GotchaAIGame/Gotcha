package org.a602.gotcha.domain.participant.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.participant.request.ParticipantCheckRequest;
import org.a602.gotcha.domain.participant.service.ParticipantService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Tag(name = "Participant", description = "게임 참여자 관련 API")
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
public class ParticipantController {

    private final ParticipantService participantService;

    @Operation(description = "유저 신규 등록하기", summary = "유저 신규 등록하기")
    @ApiResponse(responseCode = "200", description = "유저 등록 성공")
    @ApiResponse(responseCode = "400", description = "중복된 닉네임 있음")
    @ApiResponse(responseCode = "404", description = "해당하는 방 존재하지 않음")
    @PostMapping("/register")
    public BaseResponse<Object> getParticipantInfo(@Valid ParticipantCheckRequest request) {
        participantService.registerUser(request);
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

}
