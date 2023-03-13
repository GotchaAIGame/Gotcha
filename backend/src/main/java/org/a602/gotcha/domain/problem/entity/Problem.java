package org.a602.gotcha.domain.problem.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.problemimage.entity.ProblemImage;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "problem")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "hint")
    private String hint;

    @Column(name = "s3_url")
    private String S3URL;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<ProblemImage> problemImages = new LinkedHashSet<>();

    @Builder
    public Problem(String name, String description, String hint, String S3URL, Room room) {
        this. name = name;
        this.description = description;
        this.hint = hint;
        this.S3URL = S3URL;
        this.room = room;
    }

}