package org.a602.gotcha.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.a602.gotcha.domain.room.entity.Room;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Builder
    public Member(String nickname, String password, String organization, String email, String registrationId) {
        this.nickname = nickname;
        this.password = password;
        this.organization = organization;
        this.registrationId = registrationId;
    }

}