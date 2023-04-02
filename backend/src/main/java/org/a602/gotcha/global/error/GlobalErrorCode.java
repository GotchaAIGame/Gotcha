package org.a602.gotcha.global.error;

import lombok.Getter;

/**
 * 프로젝트 내 사용되는 에러 코드
 */
@Getter
public enum GlobalErrorCode {
    /**
     * 에러코드 규칙 :
     * 1. 코드 맨 앞에는 연관된 Entity의 첫글자의 대문자를 적는다 ex)  Member -> M
     * 2. 에러 코드와 이름 , 메시지가 최대한 모호하지 않게 작성합니다.
     * 3. 공통으로 발생하는 에러에 대해서는 Global -> G를 붙여서 작성 합니다.
     */
    SUCCESS(200, "G000", "요청에 성공하였습니다."),
    OTHER(500, "G100", "서버에 오류가 발생했습니다"),
    METHOD_NOT_ALLOWED(405, "G200", "허용되지 않은 메서드입니다"),
    VALID_EXCEPTION(400, "G300", ""),
    ACCESS_DENIED(401, "G400", "허용되지 않은 사용자입니다"),
    TOKEN_EXPIRED(401, "G500", "토큰이 만료되었습니다."),
    LOGIN_INFO_MISMATCH(401, "G600", "로그인 정보가 일치하지 않습니다."),
    ROOM_NOT_FOUND(404, "R100", "존재하지 않는 방입니다"),
    ROOM_EXPIRED(403, "R200", "해당 게임방에 접근할 수 없습니다."),
    PROBLEM_NOT_FOUND(404, "PR100", "존재하지 않는 문제 입니다."),
    DUPLICATED_PARTICIPANT(400, "P100", "닉네임이 일치하는 참가자가 있습니다."),
    PARTICIPANT_NOT_FOUND(404, "P200", "해당하는 유저가 없습니다"),
    INVALID_PHONE_NUMBER(400, "P300", "잘못된 형태의 휴대폰 입력입니다"),
    UPDATE_FAILED(500, "P400", "참여자 정보 업데이트에 실패했습니다."),
    REWARD_NOT_FOUND(404, "RW100", "리워드를 찾을 수 없습니다"),
    /*member 관련 에러코드*/
    EMAIL_NOT_FOUND(404, "M100", "존재하지 않는 이메일입니다."),
    DUPLICATE_NICKNAME(400, "M200", "이미 존재하는 닉네임입니다."),
    DUPLICATE_EMAIL(400, "M300", "이미 존재하는 이메일입니다."),
    MISMATCH_PASSWORD(401, "M400", "비밀번호가 다릅니다."),
    INVALID_DATA_TYPE(400, "S100", "지원하는 데이터 타입이 아닙니다. 이미지 타입이어야 함"),
    ;

    private final String code;
    private final String message;
    private final int status;

    GlobalErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
