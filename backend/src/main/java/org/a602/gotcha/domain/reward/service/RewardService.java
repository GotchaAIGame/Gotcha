package org.a602.gotcha.domain.reward.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.Reward;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.SetRewardRequest.RewardDTO;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardService {
    private final RewardRepository rewardRepository;
    private final RoomRepository roomRepository;

    public void setReward(List<RewardDTO> rewards, Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> {
            throw new RoomNotFoundException();
        });


        List<Reward> rewardEntityList = new ArrayList<>();
        for (RewardDTO rewardDTO : rewards) {
            Reward reward = new Reward(rewardDTO.getName(), rewardDTO.getGrade(), room);
            rewardEntityList.add(reward);
        }
        rewardRepository.saveAll(rewardEntityList);
    }
}
