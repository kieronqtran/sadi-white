package sadi.whitegroup.assignment1.service;

import org.springframework.stereotype.Service;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.repository.TestRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TestService {
    private final TestRepository testRepository;

    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    public List<TestTypeDTO> getTypes() {
        return StreamSupport.stream(testRepository
                .findAll().spliterator(), false)
                .map(TestTypeDTO::new)
                .collect(Collectors.toList());
    }
}
