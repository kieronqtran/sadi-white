package sadi.whitegroup.assignment1.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Result;

import java.util.List;

/**
 * Created by 전소연 on 11/17/2017.
 */
@Repository
public interface ResultRepository extends CrudRepository<Result, Long>{

}

