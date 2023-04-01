package org.a602.gotcha.domain.room.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
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
import org.a602.gotcha.domain.room.response.RoomSummaryInfo;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final MemberRepository memberRepository;


    @Transactional(readOnly = true)
    public GameInfoResponse getRoomInfo(int roomCode) {
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
                .hasReward(gameRoom.getHasReward())
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
                                .image(reward.getImage())
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

    @Transactional
    public Room createRoom(CreateRoomRequest request) {
        List<CreateProblemRequest> problems = request.getProblems();
        List<Problem> problemList = new ArrayList<>();
        Member member = (Member) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = memberRepository.findMemberByEmail(member.getEmail()).orElseThrow();


        int code = random.nextInt(90_0000) + 100_000;
        Room room = Room.builder()
                .color(request.getBrandColor())
                .title(request.getTitle())
                .endTime(request.getEndTime())
                .logoUrl(request.getLogoUrl())
                .eventUrl(request.getEventUrl())
                .startTime(request.getStartTime())
                .member(member)
                .code(code)
                .build();

        for (CreateProblemRequest problem : problems) {

            String uploadImageUrl = s3Service.uploadImage(problem.getImage());

            Problem build = Problem.builder()
                    .hint(problem.getHint())
                    .name(problem.getName())
                    .room(room)
                    .imageUrl(uploadImageUrl)
                    .build();
            problemList.add(build);
            room.getProblems().addAll(problemList);

        }
        roomRepository.save(room);
        return room;

    }

    @Transactional
    public void closeRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }

    @Transactional
    public void updateRoom(Long roomId, String color, String logoUrl, String title, String eventUrl, String eventDesc, LocalDateTime startTime, LocalDateTime endTime) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        room.updateRoom(color, logoUrl, title, eventUrl, eventDesc, startTime, endTime);
    }

    public Room findById(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> {
            throw new RoomNotFoundException();
        });
    }

    private void checkRoomValidation(Long roomID) {
        boolean isExist = roomRepository.existsById(roomID);
        if (!isExist) {
            throw new RoomNotFoundException();
        }
    }

    private Room findRoom(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public Room getRoomWithAllRelations(Long roomId) {
        return roomRepository.findOneWithAllRelationships(roomId);
    }

    @Transactional(readOnly = true)
    public Page<RoomSummaryInfo> getRoomIdsByMemberId(Long memberID, Pageable pageable) {

        return roomRepository.findByMemberId(memberID, pageable);

    }
}
