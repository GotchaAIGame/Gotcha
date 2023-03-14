package org.a602.gotcha.global.redis;

import org.a602.gotcha.global.security.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisRefreshTokenRepository extends CrudRepository<RefreshToken, String> {

}
