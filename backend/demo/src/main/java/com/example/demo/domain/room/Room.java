package com.example.demo.domain.room;

import com.example.demo.domain.member.Member;
import com.example.demo.domain.participant.Participant;
import com.example.demo.domain.problem.Problem;
import com.example.demo.domain.reward.Reward;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
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

    @Column(name = "description")
    private String description;

    @Column(name = "start_time")
    private LocalDateTime start_time;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private List<Participant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private List<Reward> rewards = new ArrayList<>();

    @OneToMany(mappedBy = "room", orphanRemoval = true)
    private Set<Problem> problems = new LinkedHashSet<>();

}