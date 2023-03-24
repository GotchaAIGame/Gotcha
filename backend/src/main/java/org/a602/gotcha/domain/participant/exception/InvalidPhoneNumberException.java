package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class InvalidPhoneNumberException extends GlobalBaseException {

    public InvalidPhoneNumberException() {
        super(GlobalErrorCode.INVALID_PHONE_NUMBER);
    }
}
