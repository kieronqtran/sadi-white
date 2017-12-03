package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Answer;
import sadi.whitegroup.assignment1.entity.Question;

import java.util.List;


/**
 * Spring Data JPA repository for the Answer entity.
 */
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

}
