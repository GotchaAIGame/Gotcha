package org.a602.gotcha.domain.room.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "color", length = 20)
    private String color;

    @Column(name = "logo_url", length = 100)
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
    private Boolean hasReward;

    @Column(name = "reward_desc")
    private String rewardDesc;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private List<Participant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private List<Reward> rewards = new ArrayList<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private Set<Problem> problems = new LinkedHashSet<>();

    @Builder
    public Room(String color, String logoUrl, String title, String eventUrl, String eventDesc, int code, String description, LocalDateTime startTime, LocalDateTime endTime, Boolean hasReward, String rewardDesc, Member member) {
        this.color = color;
        this.logoUrl = logoUrl;
        this.title = title;
        this.eventUrl = eventUrl;
        this.eventDesc = eventDesc;
        this.code = code;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hasReward = hasReward;
        this.rewardDesc = rewardDesc;
        this.member = member;
    }

    public void updateRoom(String color, String logoUrl, String title, String eventUrl, String description, LocalDateTime startTime, LocalDateTime endTime) {
        this.color = color;
        this.logoUrl = logoUrl;
        this.title = title;
        this.eventUrl = eventUrl;
        this.eventDesc = description;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}