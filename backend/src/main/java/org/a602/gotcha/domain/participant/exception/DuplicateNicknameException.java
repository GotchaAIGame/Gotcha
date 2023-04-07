package org.a602.gotcha.domain.participant.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class DuplicateNicknameException extends GlobalBaseException {

    public DuplicateNicknameException() {
        super(GlobalErrorCode.DUPLICATED_PARTICIPANT);
    }
}
