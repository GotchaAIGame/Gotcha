package org.a602.gotcha.domain.participant.service;

import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.member.repository.MemberRepository;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.participant.exception.DuplicateNicknameException;
import org.a602.gotcha.domain.participant.repository.ParticipantRepository;
import org.a602.gotcha.domain.participant.request.ParticipantCheckRequest;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.exception.RoomNotFoundException;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ParticipantServiceTest {

    @Autowired
    private ParticipantService participantService;
    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RoomRepository roomRepository;

    Long ROOM_ID;
    String USER_NICKNAME = "yezi";
    String USER_PWD = "1234";

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
                .description("연습용 게임입니다")
                .startTime(LocalDateTime.parse("2023-03-01T09:00:00"))
                .endTime(LocalDateTime.parse("2023-03-07T18:00:00"))
                .hasReward(false)
                .member(member).build();
        Room savedRoom = roomRepository.save(room);
        ROOM_ID = savedRoom.getId();
        // 참여자 생성
        Participant participant = Participant.builder()
                .nickname(USER_NICKNAME)
                .password(USER_PWD)
                .room(room)
                .build();
        participantRepository.save(participant);

    }

    @Nested
    @DisplayName("유저 등록하기 서비스 메소드는")
    class registerUser {

        @Test
        @DisplayName("찾는 방이 없으면 RoomNotFound 예외 발생")
        void notValidCode() {
            // given
            ParticipantCheckRequest request = ParticipantCheckRequest.builder()
                    .roomId(1000000L)
                    .nickname("yezi")
                    .password("1111")
                    .build();
            // then
            assertThrows(RoomNotFoundException.class, ()
                    -> participantService.registerUser(request));
        }

        @Test
        @DisplayName("이미 등록된 사용자면 DuplicateNickname 예외 발생")
        void registerWithExistedNickname() {
            // given
            ParticipantCheckRequest request = ParticipantCheckRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname(USER_NICKNAME)
                    .password(USER_PWD)
                    .build();
            // then
            assertThrows(DuplicateNicknameException.class, ()
                    -> participantService.registerUser(request));
        }

        @Test
        @DisplayName("룸Id가 유효하고 중복된 닉네임이 없다면 유저 등록 성공")
        void registerUserSuccessfully() {
            // given
            ParticipantCheckRequest request = ParticipantCheckRequest.builder()
                    .roomId(ROOM_ID)
                    .nickname("Taegyu")
                    .password("1234")
                    .build();
            // when
            Participant savedUser = participantService.registerUser(request);
            // then
            assertEquals("Taegyu", savedUser.getNickname());
            assertEquals("1234", savedUser.getPassword());
        }

    }


}