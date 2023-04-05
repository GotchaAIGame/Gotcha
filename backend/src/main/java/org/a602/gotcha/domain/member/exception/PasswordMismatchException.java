package org.a602.gotcha.domain.member.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class PasswordMismatchException extends GlobalBaseException {
    public PasswordMismatchException() {
        super(GlobalErrorCode.MISMATCH_PASSWORD);
    }
}
