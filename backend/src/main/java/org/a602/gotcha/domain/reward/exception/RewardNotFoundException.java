package org.a602.gotcha.domain.reward.exception;

import org.a602.gotcha.global.error.GlobalBaseException;
import org.a602.gotcha.global.error.GlobalErrorCode;

public class RewardNotFoundException extends GlobalBaseException {

    public RewardNotFoundException() {
        super(GlobalErrorCode.REWARD_NOT_FOUND);
    }

}
