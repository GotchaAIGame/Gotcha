package org.a602.gotcha.domain.room.repository;

import org.a602.gotcha.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByCode(int code);

    @Query("SELECT r FROM Room r " +
            "LEFT JOIN FETCH r.rewards " +
            "LEFT JOIN FETCH r.problems " +
            "WHERE r.id = :id")
    Room findOneWithAllRelationships(@Param("id") Long id);


}
