package org.a602.gotcha.domain.room.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.a602.gotcha.domain.member.entity.Member;
import org.a602.gotcha.domain.participant.entity.Participant;
import org.a602.gotcha.domain.problem.entity.Problem;
import org.a602.gotcha.domain.reward.entity.Reward;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "color", length = 20)
    private String color;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "title", length = 30)
    private String title;

    @Column(name = "event_url")
    private String eventUrl;

    @Column(name = "event_desc")
    private String eventDesc;


    private int code;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "has_reward")
    @Setter
    private Boolean hasReward;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "room", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Participant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Reward> rewards = new LinkedHashSet<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    private Set<Problem> problems = new LinkedHashSet<>();

    @Builder
    public Room(String color, String logoUrl, String title, String eventUrl, String eventDesc, int code, LocalDateTime startTime, LocalDateTime endTime, Boolean hasReward, Member member) {
        this.color = color;
        this.logoUrl = logoUrl;
        this.title = title;
        this.eventUrl = eventUrl;
        this.eventDesc = eventDesc;
        this.code = code;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hasReward = hasReward;
        this.member = member;
    }

    public void updateRoom(String color, String logoUrl, String title, String eventUrl, String eventDesc, LocalDateTime startTime, LocalDateTime endTime) {
        this.color = color;
        this.logoUrl = logoUrl;
        this.title = title;
        this.eventUrl = eventUrl;
        this.eventDesc = eventDesc;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}