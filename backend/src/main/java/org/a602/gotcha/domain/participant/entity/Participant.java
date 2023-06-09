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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @Builder
    public Participant(String nickname, String password, String phoneNumber, Duration duration, Boolean isFinished, Integer solvedCnt, LocalDateTime startTime, LocalDateTime endTime, Room room) {
        this.nickname = nickname;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.duration = duration;
        this.isFinished = isFinished;
        this.solvedCnt = solvedCnt;
        this.startTime = startTime;
        this.endTime = endTime;
        this.room = room;
    }

    public void updateStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void registerRecord(Integer solvedCnt, LocalDateTime endTime, Duration duration, Boolean isFinished) {
        this.solvedCnt = solvedCnt;
        this.endTime = endTime;
        this.duration = duration;
        this.isFinished = isFinished;
    }

    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}