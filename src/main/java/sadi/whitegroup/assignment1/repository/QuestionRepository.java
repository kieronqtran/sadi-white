package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Question;


/**
 * Spring Data JPA repository for the Question entity.
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

}
