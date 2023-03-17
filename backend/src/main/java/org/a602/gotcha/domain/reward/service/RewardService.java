package org.a602.gotcha.domain.reward.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest.RewardDTO;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardService {
    private final RewardRepository rewardRepository;
    private final RoomRepository roomRepository;

    private final S3Service s3Service;

    public void setReward(List<RewardDTO> rewards, Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> {
            throw new RoomNotFoundException();
        });


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

        for (UpdateRewardDTO updateRewardDTO : rewardDTOList) {
            Long rewardId = updateRewardDTO.getRewardId();
            Reward reward = rewardRepository.findById(rewardId).orElseThrow(() -> {
                throw new RewardNotFoundException();
            });
            String uploadImage = uploadImageIfPresent(updateRewardDTO.getImage());
            reward.update(updateRewardDTO.getGrade(), updateRewardDTO.getName(), uploadImage);
        }
    }

    private String uploadImageIfPresent(String image) {
        if (image != null) {
            return s3Service.uploadImage(image);
        }
        return null;
    }

    public void deleteReward(Long rewardId) {
        rewardRepository.deleteById(rewardId);
    }
}

