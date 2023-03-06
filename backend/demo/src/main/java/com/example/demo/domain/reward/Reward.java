package com.example.demo.domain.reward;

import com.example.demo.domain.room.Room;

import javax.persistence.*;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

}