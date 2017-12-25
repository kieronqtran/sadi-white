package sadi.whitegroup.assignment1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Result;

import java.util.stream.Stream;


/**
 * Spring Data JPA repository for the Result entity.
 */
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

    @Query("SELECT r FROM Result as r INNER JOIN r.testing as t ORDER BY (r.numberOfCorrectAnswer * 100) / t.size DESC")
    Page<Result> findAllTopScore(Pageable pageable);

}
