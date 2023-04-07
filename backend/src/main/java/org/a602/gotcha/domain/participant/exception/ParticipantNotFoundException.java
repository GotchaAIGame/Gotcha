package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class ParticipantNotFoundException extends GlobalBaseException {

    public ParticipantNotFoundException() {
        super(GlobalErrorCode.PARTICIPANT_NOT_FOUND);
    }
}
