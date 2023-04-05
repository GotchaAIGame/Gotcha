package org.a602.gotcha.domain.room.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class RoomNotStartException extends GlobalBaseException {

    public RoomNotStartException() {
        super(GlobalErrorCode.ROOM_NOT_START);
    }
}
