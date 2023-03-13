package org.a602.gotcha.domain.problem.service;

import lombok.RequiredArgsConstructor;

import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.exception.ProblemNotFoundException;
import org.a602.gotcha.domain.problem.exception.ProlbemNotFoundException;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.request.UpdateProblemRequest;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)

public class ProblemService {

    private final ProblemRepository problemRepository;
    private final S3Service s3Service;

    @Transactional
    public void updateProblem(UpdateProblemRequest request) {
        Problem problem = problemRepository.findById(request.getProblemId()).orElseThrow(() -> {
            throw new ProlbemNotFoundException();
        });
        String image = request.getImage();
        String uploadImageUrl = s3Service.uploadImage(image);
        String prevImageUrl = problem.updateImageUrl(uploadImageUrl);
        s3Service.deleteImage(prevImageUrl);
    }

    public void deleteProblem(Long problemId) {
        problemRepository.deleteById(problemId);
    }
    @Transactional(readOnly = true)
    public List<ProblemListResponse> getProblemList(Long roomId) {
        List<Problem> problems = problemRepository.findProblemsByRoomId(roomId);
        if(problems.size() == 0) {
            throw new ProblemNotFoundException();
        }
        return problems.stream()
                .map(problem ->
                        ProblemListResponse.builder()
                                .problemId(problem.getId())
                                .problemName(problem.getName())
                                .problemDesc(problem.getDescription())
                                .problemImgURL(problem.getImageUrl())
                                .build()).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public String findHint(Long problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(ProblemNotFoundException::new);
        return problem.getHint();
    }
}
