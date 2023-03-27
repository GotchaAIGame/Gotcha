package org.a602.gotcha.domain.reward.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.request.DeleteRewardRequest;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest;
import org.a602.gotcha.domain.reward.service.RewardService;
import org.a602.gotcha.global.common.BaseResponse;
import org.a602.gotcha.global.error.GlobalErrorCode;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")

public class RewardController {
    private final RewardService rewardService;

    @GetMapping("/set/reward")
    @ApiResponse(description = "방에 리워드 설정", responseCode = "200")
    @Operation(description = "게임에 리워드 설정", summary = "게임에 리워드 설정")
    public BaseResponse<Void> getReward(@Valid @RequestBody SetRewardRequest request) {

        rewardService.setReward(request.getRewards(), request.getRoomId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @PostMapping("/set/reward")
    @ApiResponse(description = "방에 리워드 설정", responseCode = "200")
    @Operation(description = "게임에 리워드 설정", summary = "게임에 리워드 설정")
    public BaseResponse<Void> rewardSetAtRoom(@Valid @RequestBody SetRewardRequest request) {

        rewardService.setReward(request.getRewards(), request.getRoomId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @PutMapping("/set/reward")
    @ApiResponse(description = "방에 리워드 수정", responseCode = "200")
    @Operation(description = "게임에 리워드 수정", summary = "게임에 리워드 수정")
    public BaseResponse<Void> updateReward(@Valid @RequestBody UpdateRewardRequest request) {

        rewardService.updateReward(request.getRewards(), request.getRoomId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }

    @DeleteMapping("/set/reward")
    @ApiResponse(description = "방에 리워드 삭제", responseCode = "200")
    @Operation(description = "게임에 리워드 삭제", summary = "게임에 리워드 삭제")
    public BaseResponse<Void> deleteReward(@Valid @RequestBody DeleteRewardRequest request) {

        rewardService.deleteReward(request.getRewardId());
        return new BaseResponse<>(GlobalErrorCode.SUCCESS);
    }
}
