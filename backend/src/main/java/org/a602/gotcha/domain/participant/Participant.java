package org.a602.gotcha.domain.participant;

import org.a602.gotcha.domain.room.Room;

import javax.persistence.*;
import java.time.Duration;

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