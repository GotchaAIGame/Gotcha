package org.a602.gotcha.domain.room.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.response.EventDetailResponse;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoomService {
    
    private final RoomRepository roomRepository;

    private final RewardRepository rewardRepository;

    @Transactional(readOnly = true)
    public GameInfoResponse getRoomInfo(String roomCode) {
        Room gameRoom = roomRepository.findByCode(roomCode)
                .orElseThrow(RoomNotFoundException::new);
        if(gameRoom.getEndTime().isBefore(LocalDateTime.now())){
            throw new RoomExpiredException();
        }
        return GameInfoResponse.builder()
                .roomId(gameRoom.getId())
                .color(gameRoom.getColor())
                .logoUrl(gameRoom.getLogoUrl())
                .title(gameRoom.getTitle())
                .build();
    }

    @Transactional(readOnly = true)
    public List<RewardListResponse> getGameRewardList(Long roomId) {
        roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        List<Reward> rewards = rewardRepository.findRewardsByRoomId(roomId);
        if(rewards.size() == 0) {
            throw new RewardNotFoundException();
        }
        return rewards.stream()
                .map(reward ->
                        RewardListResponse.builder()
                                .grade(reward.getGrade())
                                .rewardName(reward.getName())
                                .build()).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EventDetailResponse getEventDetail(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        return EventDetailResponse.builder()
                .eventDesc(room.getEventDesc())
                .eventUrl(room.getEventUrl())
                .build();
    }
}
