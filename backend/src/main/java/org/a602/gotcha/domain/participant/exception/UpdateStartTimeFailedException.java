package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class UpdateStartTimeFailedException extends GlobalBaseException {

    public UpdateStartTimeFailedException() {
        super(GlobalErrorCode.UPDATE_FAILED);
    }

}

