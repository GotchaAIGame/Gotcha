package org.a602.gotcha.domain.room.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class RoomNotFoundException extends GlobalBaseException {

    public RoomNotFoundException() {
        super(GlobalErrorCode.ROOM_NOT_FOUND);
    }

}
