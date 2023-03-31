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

    @Query(value = "select new org.a602.gotcha.domain.room.response.RoomSummaryInfo(r.id, r.logoUrl, r.eventDesc, r.code, r.startTime, r.endTime,r.title,r.problems.size) from Room r where r.member.id = :id")
    Page<RoomSummaryInfo> findByMemberId(@Param("id") Long id, Pageable pageable);


}
