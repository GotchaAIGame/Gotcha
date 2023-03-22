package org.a602.gotcha.domain.member.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.a602.gotcha.domain.room.Room;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "member")
public class Member implements UserDetails {
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

	@Column(name = "profile_image", length = 100)
	private String profileImage;

	@OneToMany(mappedBy = "member", orphanRemoval = true)
	private List<Room> rooms = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();

	public void encodePassword(final PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(password);
	}

	public void updateMember(final Member member) {
		this.id = member.getId();
		this.nickname = member.getNickname();
		this.organization = member.getOrganization();
		this.registrationId = member.getRegistrationId();
		this.profileImage = member.getProfileImage();
		this.email = member.getEmail();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Stream.of("ROLE_USER")
			.map(SimpleGrantedAuthority::new)
			.collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}