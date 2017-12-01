package sadi.whitegroup.assignment1.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sadi.whitegroup.assignment1.entity.Result;

import java.util.Optional;


/**
 * Spring Data JPA repository for the Result entity.
 */
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

	// create a function to fetch all result by user here
}
