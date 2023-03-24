package org.a602.gotcha.domain.room.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.a602.gotcha.domain.room.service.RoomService;
import org.a602.gotcha.global.common.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@Tag(name = "Game Room", description = "Game Room API")
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class RoomController {

    private final RoomService roomService;

    @Operation(description = "코드 통해 게임 입장하는 API", summary = "코드 통해 게임 입장하는 API")
    @ApiResponse(responseCode = "200", description = "입장 성공", content = @Content(schema = @Schema(implementation = Long.class)))
    @ApiResponse(responseCode = "404", description = "방 정보를 찾을 수 없음")
    @ApiResponse(responseCode = "403", description = "해당 방에 접근할 수 없음(유효기간 만료)")
    @GetMapping("/game/enter")
    public BaseResponse<GameInfoResponse> enterRoom(@NotNull @RequestParam String roomCode) {
        GameInfoResponse gameInfoResponse = roomService.getRoomInfo(roomCode);
        return new BaseResponse<>(gameInfoResponse);
    }

    @Operation(description = "우승 상품 확인하기 API", summary = "우승 상품 확인하기 API")
    @ApiResponse(responseCode = "200", description = "우승 상품 불러오기 성공", content = @Content(schema = @Schema(implementation = RewardListResponse.class)))
    @ApiResponse(responseCode = "404", description = "우승 상품 찾을 수 없음")
    @GetMapping("/game/reward")
    public BaseResponse<List<RewardListResponse>> getGameRewardList(@RequestParam Long roomId) {
        List<RewardListResponse> rewardList = roomService.getGameRewardList(roomId);
        return new BaseResponse<>(rewardList);
    }

}
