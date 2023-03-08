package org.a602.gotcha.domain.room.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class RoomExpiredException extends GlobalBaseException {

    public RoomExpiredException() {
        super(GlobalErrorCode.ROOM_EXPIRED);
    }

}
