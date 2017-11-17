package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Test;

import java.util.List;

@Repository
public interface TestRepository extends CrudRepository<Test, Long> {
    @Query("select t from Test t where t.type = ?1")
    List<Test> findAllByType(String type);
}
