package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class UpdateParticipantFailedException extends GlobalBaseException {

    public UpdateParticipantFailedException() {
        super(GlobalErrorCode.UPDATE_FAILED);
    }

}

