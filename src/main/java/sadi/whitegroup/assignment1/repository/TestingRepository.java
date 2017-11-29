package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Testing;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Testing entity.
 */
@Repository
public interface TestingRepository extends JpaRepository<Testing, Long> {

    @Query("SELECT t FROM Testing t INNER JOIN FETCH t.questions WHERE t.id = :id ")
    Optional<Testing> findOneWithQuestionAndAnswerById (Long id);
}
