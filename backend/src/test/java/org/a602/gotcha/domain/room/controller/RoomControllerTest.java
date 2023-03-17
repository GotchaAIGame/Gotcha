package org.a602.gotcha.domain.room.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.domain.member.Member;
import org.a602.gotcha.domain.room.Room;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.domain.room.request.UpdateRoomRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class RoomControllerTest {

    @Autowired
    EntityManager em;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    ObjectMapper objectMapper;

    String url = "http://localhost:8080/api/";
    private Room room;

    @BeforeEach
    void setUp() {
        Member member = new Member();
        em.persist(member);
        room = new Room();
        em.persist(room);

    }
    
    @Test
    void updateRoom() throws Exception {
        UpdateRoomRequest updateRoomRequest = new UpdateRoomRequest(
                room.getId(),
                "색깔",
                "로고",
                "제목",
                "이벤트",
                "내용",
                LocalDateTime.of(2023, 3, 17, 12, 0, 0),
                LocalDateTime.of(2023, 3, 17, 12, 5, 0)
        );

        mockMvc.perform(put(url + "set/room")
                .content(objectMapper.writeValueAsBytes(updateRoomRequest))
                .contentType(MediaType.APPLICATION_JSON));

        em.flush();
        em.clear();
        Room updateRoom = em.find(Room.class, room.getId());
        Assertions.assertEquals("이벤트", updateRoom.getEventUrl());
        Assertions.assertEquals("색깔", updateRoom.getColor());
        Assertions.assertEquals("로고", updateRoom.getLogoUrl());
        Assertions.assertEquals("이벤트", updateRoom.getEventUrl());
        Assertions.assertEquals("내용", updateRoom.getDescription());
        Assertions.assertEquals(LocalDateTime.of(2023, 3, 17, 12, 0, 0), updateRoom.getStartTime());
        Assertions.assertEquals(LocalDateTime.of(2023, 3, 17, 12, 5, 0), updateRoom.getEndTime());

    }
}