package org.a602.gotcha.global.error;


/**
 * 프로젝트 에러를 반환 할 때 사용하는 기본 클래스
 * errorCode를 주입받아야 한다.
 */
public class GlobalBaseException extends RuntimeException {
    private final GlobalErrorCode errorCode;

    public GlobalBaseException(GlobalErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public GlobalErrorCode getErrorCode() {
        return errorCode;
    }

}
