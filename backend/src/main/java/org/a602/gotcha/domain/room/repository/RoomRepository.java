package org.a602.gotcha.domain.room.repository;

import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.response.RoomSummaryInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = "select r from Room r where r.member.id = :id", nativeQuery = false)
    Page<RoomSummaryInfo> findByMember_Id(@Param("id") Long id, Pageable pageable);


}
