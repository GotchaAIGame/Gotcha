package org.a602.gotcha.domain.room.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.request.CreateProblemRequest;
import org.a602.gotcha.domain.room.request.CreateRoomRequest;
import org.a602.gotcha.domain.room.response.EventDetailResponse;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private final Random random = new Random();
    private final S3Service s3Service;

    private final RewardRepository rewardRepository;


    @Transactional(readOnly = true)
    public GameInfoResponse getRoomInfo(String roomCode) {
        Room gameRoom = roomRepository.findByCode(roomCode)
                .orElseThrow(RoomNotFoundException::new);
        if (gameRoom.getEndTime().isBefore(LocalDateTime.now())) {
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
        checkRoomValidation(roomId);
        List<Reward> rewards = rewardRepository.findRewardsByRoomId(roomId);
        if (rewards.isEmpty()) {
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
        Room room = findRoom(roomId);
        return EventDetailResponse.builder()
                .eventDesc(room.getEventDesc())
                .eventUrl(room.getEventUrl())
                .build();
    }


    public void createRoom(CreateRoomRequest request) {
        List<CreateProblemRequest> problems = request.getProblems();
        List<Problem> problemList = new ArrayList<>();

        int code = random.nextInt(100_0000);
        Room room = Room.builder()
                .color(request.getBrandColor())
                .title(request.getTitle())
                .endTime(request.getEndTime())
                .logoUrl(request.getLogoUrl())
                .eventUrl(request.getEventUrl())
                .startTime(request.getStartTime())
                .description(request.getDescription())
                .code(code)
                .build();
        for (CreateProblemRequest problem : problems) {

            String uploadImageUrl = s3Service.uploadImage(problem.getImage());

            Problem build = Problem.builder()
                    .hint(problem.getHint())
                    .name(problem.getName())
                    .room(room)
                    .imageUrl(uploadImageUrl)
                    .description(problem.getDescription()).build();
            problemList.add(build);
            room.getProblems().addAll(problemList);

        }

        roomRepository.save(room);
    }


    public void closeRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    public void updateRoom(Long roomId, String color, String logoUrl, String title, String eventUrl, String description, LocalDateTime startTime, LocalDateTime endTime) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> {
            throw new RoomNotFoundException();
        });
        room.updateRoom(color, logoUrl, title, eventUrl, description, startTime, endTime);

    }

    public Room findById(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> {
            throw new RoomNotFoundException();
        });
    }

    private void checkRoomValidation(Long roomID) {
        roomRepository.findById(roomID)
                .orElseThrow(RoomNotFoundException::new);
    }

    private Room findRoom(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
    }
}
