package org.a602.gotcha.domain.room.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.exception.MemberNotFoundException;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.exception.RewardNotFoundException;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.exception.RoomNotStartException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.request.CreateProblemRequest;
import org.a602.gotcha.domain.room.request.CreateRoomRequest;
import org.a602.gotcha.domain.room.request.UpdateRoomRequest;
import org.a602.gotcha.domain.room.response.CreateRoomResponse;
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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class RoomService {
	private final RoomRepository roomRepository;

	private final Random random = new SecureRandom();
	private final S3Service s3Service;

	private final RewardRepository rewardRepository;
	private final MemberRepository memberRepository;

	@Transactional(readOnly = true)
	public GameInfoResponse getRoomInfo(int roomCode) {
		Room gameRoom = roomRepository.findByCode(roomCode)
			.orElseThrow(RoomNotFoundException::new);
		if (gameRoom.getEndTime().isBefore(LocalDateTime.now())) {
			throw new RoomExpiredException();
		} else if (gameRoom.getStartTime().isAfter(LocalDateTime.now())) {
			throw new RoomNotStartException();
		}
		return GameInfoResponse.toResponse(gameRoom);
	}

	@Transactional(readOnly = true)
	public List<RewardListResponse> getGameRewardList(Long roomId) {
		checkRoomValidation(roomId);
		List<Reward> rewards = rewardRepository.findRewardsByRoomId(roomId);
		if (rewards.isEmpty()) {
			throw new RewardNotFoundException();
		}
		return rewards.stream().map(RewardListResponse::toResponse).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public EventDetailResponse getEventDetail(Long roomId) {
		return EventDetailResponse.toResponse(findRoom(roomId));
	}

	@Transactional
	public CreateRoomResponse createRoom(CreateRoomRequest request) {
		List<CreateProblemRequest> problems = request.getProblems();
		List<Problem> problemList = new ArrayList<>();
		Member member = (Member)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		member = memberRepository.findMemberByEmail(member.getEmail()).orElseThrow(MemberNotFoundException::new);

		int code = random.nextInt(900_000) + 100_000;
		// 이미지가 없으면 기본 로고를 넣어주고, 있으면 s3에 업로드 후 url 값으로 넣어줌
		String uploadLogoUrl;
		if (request.getLogoImage() == null) {
			uploadLogoUrl = "https://a602gotcha.s3.ap-northeast-2.amazonaws.com/Gotcha!+logo.svg";
		} else {
			String fileName = System.currentTimeMillis() + request.getTitle() + "logo";
			uploadLogoUrl = s3Service.uploadImage(request.getLogoImage(), fileName);
		}

		Room room = Room.builder()
			.color(request.getBrandColor())
			.logoUrl(uploadLogoUrl)
			.title(request.getTitle())
			.eventUrl(request.getEventUrl())
			.eventDesc(request.getEventDesc())
			.code(code)
			.startTime(request.getStartTime())
			.endTime(request.getEndTime())
			.hasReward(false)
			.member(member)
			.build();

		for (CreateProblemRequest problem : problems) {
			String problemFileName = System.currentTimeMillis() + room.getTitle() + "problem";
			String uploadImageUrl = s3Service.uploadImage(problem.getImage(), problemFileName);

			Problem build = Problem.builder()
				.hint(problem.getHint())
				.name(problem.getName())
				.room(room)
				.imageUrl(uploadImageUrl)
				.build();
			problemList.add(build);
			room.getProblems().addAll(problemList);

		}
		Room savedRoom = roomRepository.save(room);
		return CreateRoomResponse.toResponse(savedRoom);

	}

	@Transactional
	public void closeRoom(Long roomId) {
		roomRepository.deleteById(roomId);
	}

	@Transactional
	public void updateRoom(UpdateRoomRequest request) {
		Room room = roomRepository.findById(request.getRoomId())
			.orElseThrow(RoomNotFoundException::new);
		String uploadLogoUrl = request.getLogoImage();
		if (!uploadLogoUrl.startsWith("https://")) {
			String fileName = System.currentTimeMillis() + request.getTitle() + "logo";
			uploadLogoUrl = s3Service.uploadImage(request.getLogoImage(), fileName);
		}
		room.updateRoom(request.getColor(), uploadLogoUrl, request.getTitle(), request.getEventUrl(),
			request.getEventDesc(), request.getStartTime(), request.getEndTime());
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
