package com.example.demo.domain.participant;

import com.example.demo.domain.room.Room;

import javax.persistence.*;
import java.time.Duration;
import java.time.Instant;

@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "duration")
    private Duration duration;

    @Column(name = "is_success")
    private Boolean isSuccess;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

}