package sadi.whitegroup.assignment1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.service.dto.UserDTO;

import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByEmailIgnoreCase(String email);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Page<User> findAllByEmail(Pageable pageable, String email);
}
