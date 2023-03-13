package org.a602.gotcha.domain.problem.service;

import lombok.RequiredArgsConstructor;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.exception.ProblemNotFoundException;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    @Transactional(readOnly = true)
    public List<ProblemListResponse> getProblemList(Long roomId) {
        List<Problem> problems = problemRepository.findByRoomId(roomId);
        if(problems.size() == 0) {
            throw new ProblemNotFoundException();
        }
        return problems.stream()
                .map(problem ->
                        ProblemListResponse.builder()
                                .problemId(problem.getId())
                                .problemName(problem.getName())
                                .problemDesc(problem.getDescription())
                                .problemImgURL(problem.getS3URL())
                                .build()).collect(Collectors.toList());
    }

}
