package org.a602.gotcha.domain.problem.service;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.exception.ProblemNotFoundException;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class ProblemServiceTest {

    @Autowired
    private ProblemService problemService;
    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RoomRepository roomRepository;

    Long ROOM_ID;
    String USER_NICKNAME = "yezi";
    String USER_PWD = "1234";
    Boolean USER_IS_FINISHED = false;

    @BeforeEach
    void setGameRoom() {

        // 멤버 생성
        Member member = new Member("yezi", "1234", "SSAFY", "yezi@ssafy.com", "일반");
        memberRepository.save(member);

        // 게임방 생성
        Room room = Room.builder()
                .color("Blue")
                .code("GAMEROOM")
                .logoUrl("ssafy.com")
                .eventUrl("ssafy.com")
                .title("새로운 게임입니다.")
                .eventDesc("연습용 게임입니다")
                .startTime(LocalDateTime.parse("2023-03-01T09:00:00"))
                .endTime(LocalDateTime.parse("2023-03-07T18:00:00"))
                .hasReward(false)
                .rewardDesc("보상 설명")
                .member(member).build();
        Room savedRoom = roomRepository.save(room);
        ROOM_ID = savedRoom.getId();
        // 참여자 생성
        Participant participant = Participant.builder()
                .nickname(USER_NICKNAME)
                .password(USER_PWD)
                .room(room)
                .isFinished(USER_IS_FINISHED)
                .build();
        participantRepository.save(participant);
        // 문제 생성
        Problem problemA = Problem.builder()
                .name("문제1")
                .description("설명")
                .hint("힌트")
                .S3URL("주소")
                .room(room)
                .build();
        Problem problemB = Problem.builder()
                .name("문제2")
                .description("설명")
                .hint("힌트")
                .S3URL("주소")
                .room(room)
                .build();
        Problem problemC = Problem.builder()
                .name("문제3")
                .description("설명")
                .hint("힌트")
                .S3URL("주소")
                .room(room)
                .build();
        problemRepository.save(problemA);
        problemRepository.save(problemB);
        problemRepository.save(problemC);
    }

    @Nested
    @DisplayName("문제 가져오기 메소드는")
    class getProblemList {

        @Test
        @DisplayName("해당 방의 문제를 찾지 못할 경우 ProblemNotFound 예외 발생")
        void getListWithInvalidRoom() {
            // when
            Long roomId = 100000000L;
            // then
            assertThrows(ProblemNotFoundException.class, ()
            -> problemService.getProblemList(roomId));
        }

        @Test
        @DisplayName("오류 미발생시 ProblemList 반환")
        void getList() {
            // when
            List<ProblemListResponse> problemList = problemService.getProblemList(ROOM_ID);
            // then
            assertEquals(3, problemList.size());
        }

    }

}