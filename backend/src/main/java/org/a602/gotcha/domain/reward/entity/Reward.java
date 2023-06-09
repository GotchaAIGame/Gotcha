package org.a602.gotcha.domain.reward.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reward")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "grade")
    private Integer grade;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Builder
    public Reward(String name, Integer grade, Room room, String image) {
        this.name = name;
        this.grade = grade;
        this.room = room;
        this.image = image;
    }

    public void update(Integer grade, String name, String image) {
        this.name = name;
        this.grade = grade;
        if (image != null) {
            this.image = image;
        }
    }
}