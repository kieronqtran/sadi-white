package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN FETCH u.resultList WHERE u.email = (:email)")
    Optional<User> findOneWithResultByEmail(String email);
}
