package org.a602.gotcha.domain.problem.service;

import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.exception.ProblemNotFoundException;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProblemServiceTest {

    @InjectMocks
    private ProblemService problemService;
    @Mock
    private ProblemRepository problemRepository;

    Long ROOM_ID = 1L;
    Long INVALID_ROOM_ID = 10L;
    Long PROBLEM_ID = 1L;
    Long INVALID_PROBLEM_ID = 10L;
    List<Problem> emptyList = new ArrayList<>();
    List<Problem> problemList = new ArrayList<>();

    @BeforeEach
    void setup() {
        for (int i = 0; i < 5; i++) {
            problemList.add(Problem.builder()
                    .name("이름" + i)
                    .description("설명" + i)
                    .imageUrl("imageUrl" + i)
                    .hint("힌트" + i).build());
        }
    }

    @Nested
    @DisplayName("getProblemList 메소드는")
    class GetProblemList {

        @Test
        @DisplayName("해당 방id의 문제가 없을 경우 ProblemNotFound 예외 발생")
        void invalidRoomId() {
            // when
            when(problemRepository.findProblemsByRoomId(INVALID_ROOM_ID)).thenReturn(emptyList);
            // then
            assertThrows(ProblemNotFoundException.class, () -> problemService.getProblemList(INVALID_ROOM_ID));
        }

        @Test
        @DisplayName("해당 방id 문제가 있을 경우 문제 목록 반환")
        void getProblemList() {
            // when
            when(problemRepository.findProblemsByRoomId(ROOM_ID)).thenReturn(problemList);
            List<ProblemListResponse> problemListReponse = problemService.getProblemList(ROOM_ID);
            // then
            assertEquals(5, problemListReponse.size());
        }
    }

    @Nested
    @DisplayName("findHint 메소드는")
    class FindHint {

        @Test
        @DisplayName("해당하는 문제가 없을 경우 ProblemNotFound 예외 발생")
        void invalidProblemId() {
            // when
            when(problemRepository.findById(INVALID_PROBLEM_ID))
                    .thenReturn(Optional.empty());
            // then
            assertThrows(ProblemNotFoundException.class, () -> problemService.findHint(INVALID_PROBLEM_ID));
        }

        @Test
        @DisplayName("해당하는 문제가 있으면 hint 값 반환")
        void findHint() {
            // given
            String hint = "힌트입니다";
            // when
            when(problemRepository.findById(PROBLEM_ID))
                    .thenReturn(Optional.of(Problem.builder()
                            .hint(hint).build()));
            // then
            assertEquals(hint, problemService.findHint(PROBLEM_ID));
        }

    }


}