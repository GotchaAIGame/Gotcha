package org.a602.gotcha.domain.room.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.room.request.CreateRoomRequest;
import org.a602.gotcha.domain.room.service.RoomService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @PostMapping("/set/room")
    @ApiResponse(description = "방 생성 성공", responseCode = "200")
    public BaseResponse<Void> createRoom(@RequestBody CreateRoomRequest request) {
        roomService.createRoom(request);
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @DeleteMapping("/set/room")
    @ApiResponse(description = "방 종료 성공", responseCode = "200")
    public BaseResponse<Void> closeRoom(@RequestBody CloseRoomRequest request) {
        roomService.closeRoom(request.getRoomId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }
}
