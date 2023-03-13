package org.a602.gotcha.domain.participant.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "password")
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "duration")
    private Duration duration;

    @Column(name = "is_finished")
    private Boolean isFinished;

    @Column(name = "solved_cnt")
    private Integer solvedCnt;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Builder
    public Participant(String nickname, String password, Room room, Boolean isFinished) {
        this.nickname = nickname;
        this.password = password;
        this.room = room;
        this.isFinished = isFinished;
    }

    public void updateStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

}