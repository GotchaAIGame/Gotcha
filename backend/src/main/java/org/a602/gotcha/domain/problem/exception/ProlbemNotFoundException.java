package org.a602.gotcha.domain.problem.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class ProlbemNotFoundException extends GlobalBaseException {
    public ProlbemNotFoundException() {
        super(GlobalErrorCode.PROBLEM_NOT_FOUND);
    }
}
