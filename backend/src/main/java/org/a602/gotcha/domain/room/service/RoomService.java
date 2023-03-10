package org.a602.gotcha.domain.room.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.problem.Problem;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.a602.gotcha.domain.room.response.RewardListResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final AmazonS3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private Random random = new Random();


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


            String image = problem.getImage();
            byte[] decode = Base64.getDecoder().decode(image);
            try (ByteArrayInputStream inputStream = new ByteArrayInputStream(decode)) {
                String key = UUID.randomUUID().toString();
                s3Client.putObject(new PutObjectRequest(bucket, key, inputStream, null));
                String url = s3Client.getUrl(bucket, key).toString();
                Problem build = Problem.builder()
                        .hint(problem.getHint())
                        .name(problem.getName())
                        .room(room)
                        .imageUrl(url)
                        .description(problem.getDescription()).build();
                problemList.add(build);
            } catch (IOException e) {
                e.printStackTrace();
            }

            room.getProblems().addAll(problemList);

        }

        roomRepository.save(room);
    }


    public void closeRoom(Long roomId) {
        roomRepository.deleteById(roomId);
    }
}
