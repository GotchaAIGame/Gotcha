package org.a602.gotcha.test;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
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
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    private void insertData() {
        String HASH_PWD = passwordEncoder.encode("602602");
        // Member 생성
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
        Room room = Room.builder()
                .color("blue")
                .logoUrl("logoImageUrl")
                .title("싸피 팝업스토어")
                .eventUrl("eventUrl")
                .code(602602)
                .eventDesc("싸피 팝업스토어입니다. 자세한 내용은 링크를 참고해주세요.")
                .hasReward(true)
                .member(member)
                .startTime(LocalDateTime.now())
                .endTime(LocalDateTime.now().plusDays(7))
                .rewardDesc("상품입니다")
                .build();
        roomRepository.save(room);
        // Participant 생성
        LocalDateTime startTime = LocalDateTime.now().plusHours(1);
        LocalDateTime endTime = LocalDateTime.now().plusHours(2);
        Participant participantA = Participant.builder()
                .nickname("2조태규")
                .password(HASH_PWD)
                .startTime(startTime)
                .endTime(endTime)
                .duration(Duration.between(startTime, endTime))
                .isFinished(true)
                .solvedCnt(5)
                .room(room)
                .build();
        Participant participantB = Participant.builder()
                .nickname("2조예지")
                .password(HASH_PWD)
                .startTime(startTime)
                .isFinished(false)
                .solvedCnt(3)
                .room(room)
                .build();
        participantRepository.save(participantA);
        participantRepository.save(participantB);
    }
}
