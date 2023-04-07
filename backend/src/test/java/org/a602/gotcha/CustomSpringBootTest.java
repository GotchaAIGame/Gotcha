package org.a602.gotcha;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@SpringBootTest
@Retention(RetentionPolicy.RUNTIME)
@ActiveProfiles(profiles = {"local", "test"})
@Target({ElementType.TYPE})
public @interface CustomSpringBootTest {
}
