package org.a602.gotcha.domain.member.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class MemberNotFoundException extends GlobalBaseException {
	public MemberNotFoundException() {
		super(GlobalErrorCode.MEMBER_NOT_FOUND);
	}
}
