package org.a602.gotcha.domain.room.mapper;

import org.a602.gotcha.domain.room.entity.Room;
import org.a602.gotcha.domain.room.response.RoomDetailResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoomToRoomDetailResponseMapper {
    RoomToRoomDetailResponseMapper INSTANCE = Mappers.getMapper(RoomToRoomDetailResponseMapper.class);

    @Mapping(source = "rewards", target = "rewards")
    @Mapping(source = "problems", target = "problems")
    RoomDetailResponse roomToRoomDetailResponse(Room room);
}