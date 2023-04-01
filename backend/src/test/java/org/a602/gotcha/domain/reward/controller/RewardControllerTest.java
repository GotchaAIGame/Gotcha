package org.a602.gotcha.domain.reward.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.a602.gotcha.CustomSpringBootTest;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.reward.entity.Reward;
import org.a602.gotcha.domain.reward.repository.RewardRepository;
import org.a602.gotcha.domain.reward.request.DeleteRewardRequest;
import org.a602.gotcha.domain.reward.request.SetRewardRequest;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest;
import org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
import org.a602.gotcha.domain.reward.service.RewardService;
import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.global.common.S3Service;
import org.a602.gotcha.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.MethodArgumentNotValidException;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@CustomSpringBootTest
@AutoConfigureMockMvc
@Transactional
@ExtendWith(MockitoExtension.class)
class RewardControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RewardRepository rewardRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    RewardService rewardService;

    @Autowired
    EntityManager entityManager;

    @MockBean
    S3Service s3Service;

    String url = "http://localhost:8080/api";
    Room room;
    Room saveRoom;
    @Autowired
    ObjectMapper objectMapper;
    String token;

    @BeforeEach
    void setUp() {
        room = Room.builder().build();
        saveRoom = Room.builder().build();
        entityManager.persist(room);
        entityManager.persist(saveRoom);

        Reward reward1 = new Reward("리워드 1", 3, room, null);
        Reward reward2 = new Reward("리워드 2", 4, room, null);
        entityManager.persist(reward1);
        entityManager.persist(reward2);

        Member member = Member.builder()
                .email("suker80@naver.com")
                .organization("삼성").build();
        token = JwtTokenProvider.BEARER + jwtTokenProvider.createAccessToken(member);
        entityManager.persist(member);
    }

//    @Test
//    @DisplayName("리워드 저장 테스트 이미지가 없는 경우")
//    void setReward() throws Exception {
//        when(s3Service.uploadImage(null, any())).thenReturn("default.jpg");
//
//        long beforeCreateRewardCount = rewardRepository.count();
//        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
//                new SetRewardRequest.RewardDTO("리워드 이름1", 1, null),
//                new SetRewardRequest.RewardDTO("리워드 이름2", 2, null)),
//                saveRoom.getId());
//        String content = objectMapper.writeValueAsString(setRewardRequest);
//        mockMvc.perform(post(url + "/set/reward")
//                .content(content)
//                .header(HttpHeaders.AUTHORIZATION, token)
//                .contentType(MediaType.APPLICATION_JSON));
//        assertAll(() -> assertEquals(beforeCreateRewardCount + setRewardRequest.getRewards().size(), rewardRepository.count())
//        );
//        List<Reward> savedReward = rewardRepository.findByRoomId(saveRoom.getId());
//
//        for (Reward reward : savedReward) {
//            assertEquals("default.jpg", reward.getImage());
//        }
//
//    }

    @Test
    @DisplayName("리워드 저장 테스트 이미지가 있는 경우")
    void rewardWithImage() throws Exception {

        when(s3Service.uploadImage(anyString(), anyString())).thenAnswer(invocation -> invocation.getArgument(0));

        String image = Base64.getEncoder().encodeToString("rkbne4ik3k2nm1m2nsj12".getBytes());
        long beforeCreateRewardCount = rewardRepository.count();
        SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                new SetRewardRequest.RewardDTO("리워드 이름1", 1, image),
                new SetRewardRequest.RewardDTO("리워드 이름2", 2, image)),
                saveRoom.getId());
        String content = objectMapper.writeValueAsString(setRewardRequest);
        mockMvc.perform(post(url + "/set/reward")
                .content(content)
                .header(HttpHeaders.AUTHORIZATION, token)
                .contentType(MediaType.APPLICATION_JSON));
        entityManager.flush();
        entityManager.clear();

        int savedRewardSizeForThisTest = setRewardRequest.getRewards().size();
        List<Reward> afterSaveReward = rewardRepository.findByRoomId(saveRoom.getId());
        assertEquals(beforeCreateRewardCount + savedRewardSizeForThisTest, rewardRepository.count());
        assertEquals(savedRewardSizeForThisTest, afterSaveReward.size());
        int index = 1;
        for (Reward reward : afterSaveReward) {
            assertNotNull(reward.getImage());
            assertEquals("리워드 이름" + index, reward.getName());
            assertEquals(index, reward.getGrade());
            index += 1;
        }
    }

    @Nested
    @DisplayName("리워드 저장 유효성 검사")
    class rewardValid {


        @Test
        @DisplayName("리워드 이름은 값이 있어야 한다.")
        void nameRequired() throws Exception {
            SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                    new SetRewardRequest.RewardDTO("", 1, null)),
                    saveRoom.getId());
            mockMvc.perform(post(url + "/set/reward")
                            .content(objectMapper.writeValueAsString(setRewardRequest))
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("리워드 등급은 양수이어야 안된다")
        void nameRequired2() throws Exception {
            SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                    new SetRewardRequest.RewardDTO("123 ", 0, null)),
                    saveRoom.getId());
            mockMvc.perform(post(url + "/set/reward")
                            .content(objectMapper.writeValueAsString(setRewardRequest))
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("리워드 등급은 널이면 안된다.")
        void gradeRequired() throws Exception {
            SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                    new SetRewardRequest.RewardDTO("이름", null, null)),
                    saveRoom.getId());
            mockMvc.perform(post(url + "/set/reward")
                            .content(objectMapper.writeValueAsString(setRewardRequest))
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                    .andExpect(status().isBadRequest());
        }

        @Test
        @DisplayName("리워드 이름은 띄어쓰기가 있으면 안된다")
        void gradeeRequired2() throws Exception {
            SetRewardRequest setRewardRequest = new SetRewardRequest(List.of(
                    new SetRewardRequest.RewardDTO(" ", 1, null)),
                    saveRoom.getId());
            mockMvc.perform(post(url + "/set/reward")
                            .content(objectMapper.writeValueAsString(setRewardRequest))
                            .header(HttpHeaders.AUTHORIZATION, token)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                    .andExpect(status().isBadRequest());
        }
    }

    @Test
    @DisplayName("리워드 수정 테스트")
    void updateReward() throws Exception {
        when(s3Service.uploadImage(anyString(), anyString())).thenAnswer(invocation -> invocation.getArgument(0));

        List<Reward> beforeUpdate = rewardRepository.findByRoomId(room.getId());
        List<UpdateRewardDTO> updateRewardDTOList = new ArrayList<>();
        int index = 0;
        for (Reward reward : beforeUpdate) {
            updateRewardDTOList.add(
                    new UpdateRewardDTO(reward.getId(), "리워드 업데이트 " + index, index + 1, null)
            );
            index += 1;
        }

        UpdateRewardRequest updateRewardRequest = new UpdateRewardRequest(updateRewardDTOList, room.getId());
        mockMvc.perform(put(url + "/set/reward")
                .content(objectMapper.writeValueAsString(updateRewardRequest))
                .header(HttpHeaders.AUTHORIZATION, token)
                .contentType(MediaType.APPLICATION_JSON));

        entityManager.flush();
        entityManager.clear();
        index = 0;
        List<Reward> afterUpdate = rewardRepository.findByRoomId(room.getId());
        for (Reward reward : afterUpdate) {
            int finalIndex = index;
            assertAll(
                    () -> assertEquals("리워드 업데이트 " + finalIndex, reward.getName()),
                    () -> assertEquals(finalIndex + 1, reward.getGrade())
            );
            index += 1;
        }
    }

    @Test
    @DisplayName("리워드 삭제 테스트")
    void removeRewardTest() throws Exception {
        List<Reward> rewardList = rewardRepository.findByRoomId(room.getId());
        int removeBeforeSize = rewardList.size();
        assertFalse(rewardList.isEmpty());
        Reward reward = rewardList.get(0);
        mockMvc.perform(delete(url + "/set/reward")
                .content(objectMapper.writeValueAsString(new DeleteRewardRequest(room.getId(), reward.getId())))
                .header(HttpHeaders.AUTHORIZATION, token)
                .contentType(MediaType.APPLICATION_JSON));
        int removeAfterSize = rewardRepository.findByRoomId(room.getId()).size();
        assertEquals(removeBeforeSize - 1, removeAfterSize);
    }

    @Test
    @DisplayName("리워드 삭제 할때 id는 필수 값임")
    void validRemoveRequest() throws Exception {
        mockMvc.perform(delete(url + "/set/reward")
                        .content(objectMapper.writeValueAsString(new DeleteRewardRequest()))
                        .header(HttpHeaders.AUTHORIZATION, token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof MethodArgumentNotValidException))
                .andExpect(status().isBadRequest());
    }
}