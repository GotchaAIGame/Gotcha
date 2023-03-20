package org.a602.gotcha.domain.reward.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest.RewardDTO;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.domain.room.service.RoomService;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardService {
    private final RewardRepository rewardRepository;
    private final RoomService roomService;
    private final S3Service s3Service;

    public void setReward(List<RewardDTO> rewards, Long roomId) {
        Room room = roomService.findById(roomId);
        List<Reward> rewardEntityList = new ArrayList<>();
        for (RewardDTO rewardDTO : rewards) {
            Reward reward = new Reward(rewardDTO.getName(), rewardDTO.getGrade(), room, rewardDTO.getImage());

            rewardEntityList.add(reward);
        }
        rewardRepository.saveAll(rewardEntityList);
    }


    @Transactional
    public void updateReward(List<UpdateRewardDTO> rewardDTOList, Long roomId) {

        rewardRepository.findByRoomId(roomId);
        Room room = roomService.findById(roomId);
        List<Reward> newRewardList = new ArrayList<>();
        for (UpdateRewardDTO updateRewardDTO : rewardDTOList) {
            Long rewardId = updateRewardDTO.getRewardId();
            Reward reward;
            String uploadImage = s3Service.uploadImage(updateRewardDTO.getImage());
            if (rewardId != null) {
                reward = rewardRepository.findById(rewardId).orElseThrow(() -> {
                    throw new RewardNotFoundException();
                });
                reward.update(updateRewardDTO.getGrade(), updateRewardDTO.getName(), uploadImage);
            } else {
                Reward newReward = new Reward(updateRewardDTO.getName(), updateRewardDTO.getGrade(), room, uploadImage);
                newRewardList.add(newReward);
            }
        }
        rewardRepository.saveAll(newRewardList);
    }

    public void deleteReward(Long rewardId) {
        rewardRepository.deleteById(rewardId);
    }
}

