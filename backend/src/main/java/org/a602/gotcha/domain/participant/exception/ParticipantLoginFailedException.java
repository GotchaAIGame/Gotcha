package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class ParticipantLoginFailedException extends GlobalBaseException {
    public ParticipantLoginFailedException() {
        super(GlobalErrorCode.LOGIN_INFO_MISMATCH);
    }
}
