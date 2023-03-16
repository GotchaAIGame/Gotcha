package org.a602.gotcha.domain.room.service;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomExpiredException;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.response.GameInfoResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class RoomServiceTest {

    @Autowired
    private RoomService roomService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private MemberRepository memberRepository;

    private ArrayList<Long> roomIds;

    @BeforeEach
    void setGameRoom() {
        // 멤버 생성
        Member member = new Member("yezi", "1234", "SSAFY", "yezi@ssafy.com", "일반");
        memberRepository.save(member);
        // 게임방 생성
        Room expiredRoom = Room.builder()
                .color("Blue")
                .code("EXPIRED")
                .logoUrl("ssafy.com")
                .eventUrl("ssafy.com")
                .title("새로운 게임입니다.")
                .eventDesc("연습용 게임입니다")
                .startTime(LocalDateTime.parse("2023-03-01T09:00:00"))
                .endTime(LocalDateTime.parse("2023-03-07T18:00:00"))
                .hasReward(false)
                .rewardDesc("보상 설명")
                .member(member).build();

        Room progressingRoom = Room.builder()
                .color("Blue")
                .code("PROGRESSING")
                .logoUrl("ssafy.com")
                .eventUrl("ssafy.com")
                .title("새로운 게임입니다.")
                .eventDesc("연습용 게임입니다")
                .startTime(LocalDateTime.parse("2023-03-01T09:00:00"))
                .endTime(LocalDateTime.now().plusDays(1))
                .hasReward(false)
                .rewardDesc("보상 설명")
                .member(member).build();

        Room saveExpiredRoom = roomRepository.save(expiredRoom);
        Room saveProgressingRoom = roomRepository.save(progressingRoom);

        roomIds = new ArrayList<>();
        roomIds.add(saveExpiredRoom.getId());
        roomIds.add(saveProgressingRoom.getId());

    }

    @Nested
    @DisplayName("방 검색하기 서비스는")
    class findRoom{

        @Test
        @DisplayName("게임코드가 없으면 RoomNotFound 예외 발생")
        void getRoomWithInvalidCode() {
            //given
            String enterCode = "INVALIDCODE";
            //then
            assertThrows(RoomNotFoundException.class, () -> {
                roomService.getRoomInfo(enterCode);
            });
        }

        @Test
        @DisplayName("현재 시간이 종료 시간 뒤면 RoomExpired예외 발생")
        void getRoomAfterEndTime() {
            String enterCode = "EXPIRED";
            assertThrows(RoomExpiredException.class, () -> {
                roomService.getRoomInfo(enterCode);
            });
        }

        @Test
        @DisplayName("방을 성공적으로 찾으면 정보 반환")
        void getRoomId() {
            String enterCode = "PROGRESSING";
            GameInfoResponse result = roomService.getRoomInfo(enterCode);
            assertEquals(roomIds.get(1), result.getRoomId());

        }
        

    }


}