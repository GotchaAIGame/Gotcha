package org.a602.gotcha.domain.problem;

import org.a602.gotcha.domain.room.Room;

import javax.persistence.*;

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


}