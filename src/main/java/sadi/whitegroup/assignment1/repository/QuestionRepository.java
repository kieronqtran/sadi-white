package sadi.whitegroup.assignment1.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Question;

/**
 * Created by 전소연 on 11/17/2017.
 */
@Repository
public interface QuestionRepository extends CrudRepository<Question, Long>{
}
