package org.a602.gotcha.domain.problem.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.problem.exception.ProblemNotFoundException;
import org.a602.gotcha.domain.problem.repository.ProblemRepository;
import org.a602.gotcha.domain.problem.request.UpdateProblemRequest;
import org.a602.gotcha.domain.problem.response.ProblemListResponse;
import org.a602.gotcha.domain.room.repository.RoomRepository;
import org.a602.gotcha.global.common.S3Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)

public class ProblemService {

    private final ProblemRepository problemRepository;
    private final S3Service s3Service;
    private final RoomRepository roomRepository;

    @Transactional
    public void updateProblem(UpdateProblemRequest request) {
        Problem problem = problemRepository.findById(request.getProblemId()).orElseThrow(() -> {
            throw new ProblemNotFoundException();
        });
        String image = request.getImage();
        String uploadImageUrl = null;
        if (image != null) {
            String fileName = System.currentTimeMillis() + "problem" + problem.getName();
            uploadImageUrl = s3Service.uploadImage(image, fileName);
        }
        String prevImageUrl = problem.updateProblem(uploadImageUrl, request.getName(), request.getHint());
        if (image != null) {
            s3Service.deleteImage(prevImageUrl);
        }

    }

    @Transactional
    public void deleteProblem(Long problemId) {
        problemRepository.deleteById(problemId);
    }

    @Transactional(readOnly = true)
    public List<ProblemListResponse> getProblemList(Long roomId) {
        List<Problem> problems = problemRepository.findProblemsByRoomId(roomId);
        if (problems.isEmpty()) {
            throw new ProblemNotFoundException();
        }
        return problems.stream()
                .map(problem ->
                        ProblemListResponse.builder()
                                .problemId(problem.getId())
                                .problemName(problem.getName())
                                .problemImgURL(problem.getImageUrl())
                                .build()).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public String findHint(Long problemId) {
        Problem problem = problemRepository.findById(problemId)
                .orElseThrow(ProblemNotFoundException::new);
        return problem.getHint();
    }

    public Optional<Problem> getProblemDetail(Long problemId) {
        return problemRepository.findById(problemId);
    }


}
