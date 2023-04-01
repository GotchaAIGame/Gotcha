//package org.a602.gotcha.domain.reward.service;
//
//
//import org.a602.gotcha.domain.reward.repository.RewardRepository;
//import org.a602.gotcha.domain.room.service.RoomService;
//import org.a602.gotcha.global.common.S3Service;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.a602.gotcha.domain.reward.request.SetRewardRequest.RewardDTO;
//import static org.a602.gotcha.domain.reward.request.UpdateRewardRequest.UpdateRewardDTO;
//import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
//import static org.mockito.Mockito.*;
//
//@ExtendWith(MockitoExtension.class)
//public class RewardServiceTest {
//
//    @Mock
//    private RoomService roomService;
//
//    @Mock
//    private S3Service s3Service;
//
//    @Mock
//    private RewardRepository rewardRepository;
//
//    @InjectMocks
//    private RewardService rewardService;
//
////    @Test
////    @DisplayName("리워드 저장 단위 테스트")
////    public void testSetReward() {
////
////        // Set up test data
////        List<RewardDTO> rewards = new ArrayList<>();
////        rewards.add(new RewardDTO("Reward1", 1, "image1"));
////        rewards.add(new RewardDTO("Reward2", 2, "image2"));
////        Long roomId = 1L;
////        Room room = Room.builder().build();
////
////        // Define the behavior of the mock dependencies
////        when(roomService.findById(roomId)).thenReturn(room);
////        when(s3Service.uploadImage("image1",any())).thenReturn("image1-url");
////        when(s3Service.uploadImage("image2", any())).thenReturn("image2-url");
////
////        // Call the method under test
////        rewardService.setReward(rewards, roomId);
////
////        // Verify that the method under test behaved as expected
////        verify(roomService).findById(roomId);
////        verify(s3Service).uploadImage("image1" ,any());
////        verify(s3Service).uploadImage("image2", any());
////
////        ArgumentCaptor<List<Reward>> argumentCaptor = ArgumentCaptor.forClass(List.class);
////        verify(rewardRepository).saveAll(argumentCaptor.capture());
////
////        List<Reward> savedRewards = argumentCaptor.getValue();
////        assertThat(savedRewards).hasSize(2);
////        assertThat(savedRewards.get(0).getName()).isEqualTo("Reward1");
////        assertThat(savedRewards.get(0).getGrade()).isEqualTo(1);
////        assertThat(savedRewards.get(0).getRoom()).isEqualTo(room);
////        assertThat(savedRewards.get(0).getImage()).isEqualTo("image1-url");
////        assertThat(savedRewards.get(1).getName()).isEqualTo("Reward2");
////        assertThat(savedRewards.get(1).getGrade()).isEqualTo(2);
////        assertThat(savedRewards.get(1).getRoom()).isEqualTo(room);
////        assertThat(savedRewards.get(1).getImage()).isEqualTo("image2-url");
////    }
//
//
////    @Test
////    @DisplayName("업데이트 단위 테스트")
////    public void testUpdateReward() {
////        // given
////        Long roomId = 1L;
////        Room room = Room.builder().build();
////
////        List<UpdateRewardDTO> rewardDTOList = Arrays.asList(
////                new UpdateRewardDTO(null, "Reward 1", 1, "Image 1"),
////                new UpdateRewardDTO(2L, "Reward 2", 2, "Image 2")
////        );
////
////        List<Reward> existingRewards = Arrays.asList(
////                new Reward("Reward 1", 1, room, null),
////                new Reward("Reward 2", 2, room, "Old Image 2")
////        );
////        List<Reward> expectedRewards = Arrays.asList(
////                new Reward("Reward 1", 1, room, "New Image 1"),
////                new Reward("Reward 2", 2, room, "New Image 2")
////        );
////
////        when(roomService.findById(roomId)).thenReturn(room);
////        when(rewardRepository.findByRoomId(roomId)).thenReturn(existingRewards);
////        when(rewardRepository.findById(2L)).thenReturn(Optional.of(existingRewards.get(1)));
////        when(s3Service.uploadImage("Image 1", any())).thenReturn("New Image 1");
////        when(s3Service.uploadImage("Image 2", any())).thenReturn("New Image 2");
////
////
////        // when
////        rewardService.updateReward(rewardDTOList, roomId);
////
////        // then
////        verify(rewardRepository, times(1)).findByRoomId(roomId);
////        verify(roomService, times(1)).findById(roomId);
////        verify(rewardRepository, times(1)).findById(2L);
////        verify(s3Service, times(1)).uploadImage("Image 1", any());
////        verify(s3Service, times(1)).uploadImage("Image 2", any());
////
////        verify(rewardRepository, times(1)).saveAll(anyList());
////    }
//
//}
