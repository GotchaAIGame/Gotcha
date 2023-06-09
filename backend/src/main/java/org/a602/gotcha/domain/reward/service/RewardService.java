package org.a602.gotcha.domain.reward.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest.RewardDTO;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
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
    private final RoomRepository roomRepository;


    @Transactional
    public void setReward(List<RewardDTO> rewards, Long roomId) {
        Room room = roomService.findById(roomId);
        List<Reward> rewardEntityList = new ArrayList<>();
        for (RewardDTO rewardDTO : rewards) {
            String fileName = System.currentTimeMillis() + room.getId() + "reward";
            String uploadImage = s3Service.uploadImage(rewardDTO.getImage(), fileName);
            Reward reward = new Reward(rewardDTO.getName(), rewardDTO.getGrade(), room, uploadImage);
            rewardEntityList.add(reward);
        }
        room.setHasReward(true);

        rewardRepository.saveAll(rewardEntityList);
    }


    @Transactional
    public void updateReward(List<UpdateRewardDTO> rewardDTOList, Long roomId) {

        rewardRepository.findByRoomId(roomId);
        Room room = roomService.findById(roomId);
        List<Reward> newRewardList = new ArrayList<>();
        for (UpdateRewardDTO updateRewardDTO : rewardDTOList) {
            Long rewardId = updateRewardDTO.getId();
            Reward reward;
            String imageUrl = updateRewardDTO.getImage();
            if (!updateRewardDTO.getImage().startsWith("https://")) {
                String fileName = System.currentTimeMillis() + room.getTitle() + "reward";
                imageUrl = s3Service.uploadImage(updateRewardDTO.getImage(), fileName);
            }
            if (rewardId != null) {
                reward = rewardRepository.findById(rewardId).orElseThrow(() -> {
                    throw new RewardNotFoundException();
                });
                reward.update(updateRewardDTO.getGrade(), updateRewardDTO.getName(), imageUrl);
            } else {
                Reward newReward = new Reward(updateRewardDTO.getName(), updateRewardDTO.getGrade(), room, imageUrl);
                newRewardList.add(newReward);
            }
        }
        if (!newRewardList.isEmpty()) {
            rewardRepository.saveAll(newRewardList);
        }

    }

    @Transactional
    public void deleteReward(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        room.setHasReward(false);
        rewardRepository.deleteByRoomId(roomId);
    }
}

