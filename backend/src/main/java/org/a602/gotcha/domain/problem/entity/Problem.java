package org.a602.gotcha.domain.problem.entity;

import org.a602.gotcha.domain.problemimage.entity.ProblemImage;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<ProblemImage> problemImages = new LinkedHashSet<>();

}