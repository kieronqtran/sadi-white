package sadi.whitegroup.assignment1.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
   User findByEmail(String email);
}
