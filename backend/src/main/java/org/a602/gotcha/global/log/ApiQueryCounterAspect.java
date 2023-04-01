package org.a602.gotcha.global.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.lang.reflect.Proxy;

/**
 * DataSource로부터 Connection을 받을 때 ConnectionInvocationHandler에 작성한 대로 동작하는 프록시 객체를 받음
 */
@Component
@Aspect
public class ApiQueryCounterAspect {

    private final ApiQueryCounter apiQueryCounter;

    public ApiQueryCounterAspect(final ApiQueryCounter apiQueryCounter) {
        this.apiQueryCounter = apiQueryCounter;
    }

    @Around("execution(* javax.sql.DataSource.getConnection())")
    public Object getConnection(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object connection = proceedingJoinPoint.proceed();
        return Proxy.newProxyInstance(
                connection.getClass().getClassLoader(),
                connection.getClass().getInterfaces(),
                new ConnectionInvocationHandler(connection, apiQueryCounter)
        );
    }
}
