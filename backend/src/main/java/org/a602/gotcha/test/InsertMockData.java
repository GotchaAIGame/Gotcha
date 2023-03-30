package org.a602.gotcha.test;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class InsertMockData {

    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final RewardRepository rewardRepository;
    private final ProblemRepository problemRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    private void insertData() {
        String HASH_PWD = passwordEncoder.encode("1234");
        // Member(출제자) 생성
        Member member = Member.builder()
                .nickname("싸피")
                .password(HASH_PWD)
                .organization("SSAFY")
                .email("ssafy@ssafy.com")
                .registrationId("NORMAL")
                .profileImage("url")
                .build();
        memberRepository.save(member);
        member.encodePassword(passwordEncoder);
        // Game Room 생성
        LocalDateTime startTime = LocalDateTime.now().minusDays(2);
        LocalDateTime endTime = LocalDateTime.now().plusDays(12);
        Room roomWithReward = Room.builder()
                .color("blue")
                .logoUrl("logoImageUrl")
                .title("싸피 팝업스토어")
                .eventUrl("eventUrl")
                .code(602602)
                .eventDesc("싸피 팝업스토어입니다. 자세한 내용은 링크를 참고해주세요.")
                .hasReward(true)
                .member(member)
                .startTime(startTime)
                .endTime(endTime)
                .build();
        roomRepository.save(roomWithReward);
        Room roomWithoutReward = Room.builder()
                .color("purple")
                .logoUrl("logoImageUrl")
                .title("규튜리는 돈 없어")
                .eventUrl("eventUrl")
                .code(111111)
                .eventDesc("규튜리를 찾아라!")
                .hasReward(false)
                .member(member)
                .startTime(startTime)
                .endTime(endTime)
                .build();
        roomRepository.save(roomWithoutReward);
        // Participant 생성
        for (int i = 1; i < 20; i++) {
            Participant.builder()
                    .nickname("나는 규튜리다" + i)
                    .password(HASH_PWD)
                    .startTime(startTime.plusHours(1))
                    .endTime(startTime.plusHours(1 + i))
                    .duration(Duration.between(startTime.plusHours(1), startTime.plusHours(1 + i)))
                    .solvedCnt(i % 5)
                    .room(roomWithReward)
                    .isFinished(true)
                    .build();
        }
        Participant participantA = Participant.builder()
                .nickname("태규")
                .password(HASH_PWD)
                .startTime(startTime)
                .endTime(startTime.plusHours(2).plusMinutes(30))
                .duration(Duration.between(startTime, endTime))
                .isFinished(true)
                .solvedCnt(4)
                .room(roomWithReward)
                .build();
        Participant participantB = Participant.builder()
                .nickname("예지")
                .password(HASH_PWD)
                .startTime(LocalDateTime.now().minusMinutes(30))
                .isFinished(false)
                .solvedCnt(2)
                .room(roomWithReward)
                .build();
        Participant participantC = Participant.builder()
                .nickname("월계")
                .password(HASH_PWD)
                .startTime(startTime)
                .endTime(startTime.plusDays(2))
                .isFinished(true)
                .solvedCnt(1)
                .room(roomWithReward)
                .build();
        participantRepository.save(participantA);
        participantRepository.save(participantB);
        participantRepository.save(participantC);
        // 리워드 생성
        for(int i = 1; i <= 3; i++) {
            Reward reward = Reward.builder()
                    .name("규튜리의 사랑 크기" + (101 - i))
                    .grade(i)
                    .build();
            rewardRepository.save(reward);
        }
        // 문제 생성
        for(int i = 1; i <= 5; i++) {
            Problem problem = Problem.builder()
                    .name("귀여운 월계입니다" + i)
                    .hint("힌트" + i)
                    .imageUrl("https://user-images.githubusercontent.com/47023884/225485373-db6f1961-15a1-49c2-9db1-05efdb930749.png")
                    .room(roomWithReward)
                    .build();
            problemRepository.save(problem);
        }
    }
}
