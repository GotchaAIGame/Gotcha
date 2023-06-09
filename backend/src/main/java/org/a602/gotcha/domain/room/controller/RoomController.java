package org.a602.gotcha.domain.room.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.a602.gotcha.domain.participant.response.AllRankListResponse;
import org.a602.gotcha.domain.participant.service.ParticipantService;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.mapper.RoomToRoomDetailResponseMapper;
import org.a602.gotcha.domain.room.request.CloseRoomRequest;
import org.a602.gotcha.domain.room.request.CreateRoomRequest;
import org.a602.gotcha.domain.room.request.UpdateRoomRequest;
import org.a602.gotcha.domain.room.response.*;
import org.a602.gotcha.domain.room.service.RoomService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Tag(name = "Game Room", description = "Game Room API")
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class RoomController {
    private final RoomService roomService;
    private final ParticipantService participantService;

    @Operation(description = "코드 통해 게임 입장하는 API", summary = "코드 통해 게임 입장하는 API")
    @ApiResponse(responseCode = "200", description = "입장 성공", content = @Content(schema = @Schema(implementation = Long.class)))
    @ApiResponse(responseCode = "404", description = "방 정보를 찾을 수 없음")
    @ApiResponse(responseCode = "403", description = "1. 시작전인 게임입니다.(R300) \t\n 2. 이미 종료된 게임입니다.(R200)")
    @GetMapping("/game/enter")
    public BaseResponse<GameInfoResponse> enterRoom(@NotNull @RequestParam int roomCode) {
        GameInfoResponse gameInfoResponse = roomService.getRoomInfo(roomCode);
        return new BaseResponse<>(gameInfoResponse);
    }

    @Operation(description = "우승 상품 확인하기 API", summary = "우승 상품 확인하기 API")
    @ApiResponse(responseCode = "200", description = "우승 상품 불러오기 성공", content = @Content(schema = @Schema(implementation = RewardListResponse.class)))
    @ApiResponse(responseCode = "404", description = "1. 방을 찾을 수 없음 \t\n 2. 우승 상품 찾을 수 없음")
    @GetMapping("/game/reward")
    public BaseResponse<List<RewardListResponse>> getGameRewardList(@NotNull @RequestParam Long roomId) {
        List<RewardListResponse> rewardList = roomService.getGameRewardList(roomId);
        return new BaseResponse<>(rewardList);
    }

    @Operation(description = "이벤트 상세 내용 확인하기 API", summary = "이벤트 상세 내용 확인하기 API")
    @ApiResponse(responseCode = "200", description = "이벤트 상세 내용 불러오기 성공", content = @Content(schema = @Schema(implementation = EventDetailResponse.class)))
    @ApiResponse(responseCode = "404", description = "방 정보 찾기 실패")
    @GetMapping("/game/detail")
    public BaseResponse<EventDetailResponse> getEventDetail(@RequestParam Long roomId) {
        EventDetailResponse eventDetail = roomService.getEventDetail(roomId);
        return new BaseResponse<>(eventDetail);
    }

    @PostMapping("/set/room")
    @ApiResponse(description = "방 생성 성공", responseCode = "200")
    @Operation(description = "방 만드는 API", summary = "방 만드는 API")
    public BaseResponse<CreateRoomResponse> createRoom(@RequestBody @Valid CreateRoomRequest request) {
        CreateRoomResponse roomInfo = roomService.createRoom(request);
        return new BaseResponse<>(roomInfo);
    }

    @DeleteMapping("/set/room")
    @ApiResponse(description = "방 종료 성공", responseCode = "200")
    @Operation(description = "방 종료 API", summary = "방 종료 API")
    public BaseResponse<Void> closeRoom(@RequestBody @Valid CloseRoomRequest request) {
        roomService.closeRoom(request.getRoomId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }


    @PutMapping("/set/room")
    @ApiResponse(description = "방 수정 성공", responseCode = "200")
    @Operation(description = "방 수정 API", summary = "방 수정 API")
    public BaseResponse<Void> updateRoom(@RequestBody @Valid UpdateRoomRequest request) {
        roomService.updateRoom(request);
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @Operation(description = "방 조회 API", summary = "방 조회 API")
    @ApiResponse(responseCode = "200", description = "방 정보 불러오기 성공", content = @Content(schema = @Schema(implementation = RoomDetailResponse.class)))
    @GetMapping("/room/{roomId}")
    public BaseResponse<RoomDetailResponse> getRoomDetail(@PathVariable Long roomId) {
        Room roomWithAllRelations = roomService.getRoomWithAllRelations(roomId);
        RoomDetailResponse roomDetailResponse = RoomToRoomDetailResponseMapper.INSTANCE.roomToRoomDetailResponse(roomWithAllRelations);
        return new BaseResponse<>(roomDetailResponse);
    }

    @Operation(description = "유저에 해당하는 방 ID들 가져오기 API", summary = "유저에 해당하는 방 ID들 가져오기 API")
    @GetMapping("/member/room/{memberID}")
    public BaseResponse<Page<RoomSummaryInfo>> getRoomIdsByMemberId(@PageableDefault Pageable pageable, @PathVariable @Valid @Positive Long memberID) {
        return new BaseResponse<>(roomService.getRoomIdsByMemberId(memberID, pageable));

    }

    @Operation(description = "(출제자용) 모든 참여자 순위 확인하기 API", summary = "(출제자용) 모든 참여자 순위 확인하기 API")
    @ApiResponse(responseCode = "200", description = "모든 참여자 랭킹 불러오기 성공", content = @Content(schema = @Schema(implementation = AllRankListResponse.class)))
    @ApiResponse(responseCode = "404", description = "방 정보 찾을 수 없음")
    @GetMapping("/rank/{roomId}")
    public BaseResponse<List<AllRankListResponse>> getAllRankList(@PathVariable Long roomId) {
        List<AllRankListResponse> allRankList = participantService.getAllRankList(roomId);
        return new BaseResponse<>(allRankList);
    }

}
