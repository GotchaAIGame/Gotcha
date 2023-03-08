package org.a602.gotcha.domain.problem.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "problem")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "hint")
    private String hint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(name = "image_url")
    private String imageUrl;

    @Builder
    public Problem(String name, String description, String hint, String imageUrl, Room room) {
        this.name = name;
        this.description = description;
        this.hint = hint;
        this.imageUrl = imageUrl;
        this.room = room;
    }

}