package com.example.demo.domain.member;

import com.example.demo.domain.room.Room;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "nickname", length = 20)
    private String nickname;

    @Column(name = "password", length = 200)
    private String password;

    @Column(name = "organization", length = 20)
    private String organization;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "registration_id", length = 20)
    private String registrationId;

    @OneToMany(mappedBy = "member", orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();


}