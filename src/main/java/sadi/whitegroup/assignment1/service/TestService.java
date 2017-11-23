package sadi.whitegroup.assignment1.service;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Service;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.entity.Question;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Test;
import sadi.whitegroup.assignment1.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TestService {
    private final TestRepository testRepository;
    private AnswerRepository answerRepository;
    private QuestionRepository questionRepository;
    private UserRepository userRepository;
    private ResultRepository resultRepository;

    public TestService(TestRepository testRepository, AnswerRepository answerRepository) {
        this.testRepository = testRepository;
        this.answerRepository = answerRepository;
    }

    public List<TestTypeDTO> getTypes() {
        return StreamSupport.stream(testRepository
                .findAll().spliterator(),false)
                .map(TestTypeDTO::new)
                .collect(Collectors.toList());
    }

    public Test getTestById(Long id) {
        return testRepository.findOne(id);
    }

    public Result markingAnswer(StudentAnswerDTO studentAnswer) {
        int numCorrectAnswer = 0;
        List<Long> answerList = studentAnswer.getAnswerId();
        for(Long ansID : answerList){
            if (answerRepository.findOne(ansID).getCorrectAnswer()){
                numCorrectAnswer++;
            }
        }

        Result result  = new Result();
        result.setNumberOfCorrectAnswer(numCorrectAnswer);
        result.setTest(testRepository.findOne(studentAnswer.getTestId()));
        result.setUser(userRepository.findOne(studentAnswer.getStudentId()));
        return resultRepository.save(result);
    }
}
