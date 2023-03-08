package org.a602.gotcha.domain.room.response;

import org.a602.gotcha.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Room findByCode(String code);

}
