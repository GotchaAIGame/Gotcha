package org.a602.gotcha.global.log;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Connection이 preparedStatement 메서드를 호출할 때 PreparedStatement 대신 프록시를 반환
 */
public class ConnectionInvocationHandler implements InvocationHandler {

    private final Object connection;
    private final ApiQueryCounter apiQueryCounter;

    public ConnectionInvocationHandler(final Object connection, final ApiQueryCounter apiQueryCounter) {
        this.connection = connection;
        this.apiQueryCounter = apiQueryCounter;
    }

    @Override
    public Object invoke(final Object proxy, final Method method, final Object[] args) throws Throwable {
        Object invokeResult = method.invoke(connection, args);
        if (method.getName().equals("prepareStatement")) {
            return Proxy.newProxyInstance(
                    invokeResult.getClass().getClassLoader(),
                    invokeResult.getClass().getInterfaces(),
                    new PreparedStatementProxyHandler(invokeResult, apiQueryCounter)
            );
        }
        return invokeResult;
    }
}
