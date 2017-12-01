package sadi.whitegroup.assignment1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.controller.dto.TestTypeDTO;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Testing;
import sadi.whitegroup.assignment1.entity.User;
import sadi.whitegroup.assignment1.repository.AnswerRepository;
import sadi.whitegroup.assignment1.repository.ResultRepository;
import sadi.whitegroup.assignment1.repository.TestingRepository;
import sadi.whitegroup.assignment1.repository.UserRepository;
import sadi.whitegroup.assignment1.security.SecurityUtils;
import sadi.whitegroup.assignment1.service.dto.ResultDTO;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TestingService {

    private final Logger log = LoggerFactory.getLogger(TestingService.class);

    private final TestingRepository testingRepository;

    private final AnswerRepository answerRepository;

    private final UserRepository userRepository;

    private final ResultRepository resultRepository;

    public TestingService(TestingRepository testingRepository, AnswerRepository answerRepository, UserRepository userRepository, ResultRepository resultRepository) {
        this.testingRepository = testingRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }

    public Testing save(Testing testing) {
        log.debug("Request to save Testing : {}", testing);
        return testingRepository.save(testing);
    }


    public List<TestTypeDTO> getTypes() {
        return testingRepository
                .findAll().stream()
                .map(TestTypeDTO::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Result markingAnswer(StudentAnswerDTO studentAnswer) {
        int numCorrectAnswer = 0;
        List<Long> answerList = studentAnswer.getAnswerId();
        for(Long ansID : answerList){
            if (answerRepository.findOne(ansID).isCorrectAnswer()){
                numCorrectAnswer++;
            }
        }

        Result result  = new Result();
        result.setNumberOfCorrectAnswer(numCorrectAnswer);
        result.testing(testingRepository.findOne(studentAnswer.getTestId()));
        result.user(userRepository.findOne(studentAnswer.getStudentId()));
        return resultRepository.save(result);
    }

    @Transactional(readOnly = true)
    public List<Testing> findAll() {
        log.debug("Request to get all Testings");
        return testingRepository.findAll();
    }


    @Transactional(readOnly = true)
    public Optional<Testing> findOne(Long id) {
        log.debug("Request to get Testing : {}", id);
        return Optional.ofNullable(testingRepository.findOne(id));
    }


    public void delete(Long id) {
        log.debug("Request to delete Testing : {}", id);
        testingRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public List<Result> getResultForCurrentAccount() {
        User user = userRepository.findOneWithAuthoritiesByEmail(SecurityUtils.getCurrentUserLogin())
                .orElse(null);

        return user.getResultList().stream().map(e -> { // EAGER FETCHING Result
            e.getTesting();
            return e;
        }).collect(Collectors.toList()); // we perform mapping to ResultDTO at the controller
    }
}
