
package org.a602.gotcha.global.log;

import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

/**
 * 각 HTTP Reqeust마다 몇 번의 Query가 생성되는지를 카운트 해줌
 */

@Component
@RequestScope
@Getter
public class ApiQueryCounter {

    private int count;

    public void increaseCount() {
        count++;
    }

}
