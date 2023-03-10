package org.a602.gotcha.domain.problemimage.entity;

import org.a602.gotcha.domain.problem.entity.Problem;

import javax.persistence.*;

@Entity
@Table(name = "problem_image")
public class ProblemImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "file_path")
    private String filePath;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;


}