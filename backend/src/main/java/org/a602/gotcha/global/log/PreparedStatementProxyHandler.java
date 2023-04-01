package org.a602.gotcha.global.log;

import org.springframework.web.context.request.RequestContextHolder;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Objects;

/**
 *
 */

public class PreparedStatementProxyHandler implements InvocationHandler {

    private final Object preparedStatement;
    private final ApiQueryCounter apiQueryCounter;

    public PreparedStatementProxyHandler(final Object preparedStatement, final ApiQueryCounter apiQueryCounter) {
        this.preparedStatement = preparedStatement;
        this.apiQueryCounter = apiQueryCounter;
    }

    /**
     * invoke 메서드를 통해 다이나믹 프록시의 target 메서드 호출을 가로챔
     * if문을 통해 execute메소드가 실행되고, API요청내에 이루어지고 있는지 확인 후 맞으면 count++
     * 메서드의 실제 구현에는 관여하지 않을 것이므로, 원래 메서드를 실행하고 결과 반환
     */
    @Override
    public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
        if (isExecuteQuery(method) && isInRequestScope()) {
            apiQueryCounter.increaseCount();
        }
        return method.invoke(preparedStatement, args);
    }

    private boolean isExecuteQuery(final Method method) {
        return method.getName().contains("execute");
    }

    private boolean isInRequestScope() {
        return Objects.nonNull(RequestContextHolder.getRequestAttributes());
    }
}