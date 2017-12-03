package sadi.whitegroup.assignment1.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sadi.whitegroup.assignment1.controller.dto.AdminTestingDTO;
import sadi.whitegroup.assignment1.controller.dto.StudentAnswerDTO;
import sadi.whitegroup.assignment1.entity.*;
import sadi.whitegroup.assignment1.repository.*;
import sadi.whitegroup.assignment1.security.SecurityUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TestingService {

    private final Logger log = LoggerFactory.getLogger(TestingService.class);

    private final TestingRepository testingRepository;

    private final AnswerRepository answerRepository;

    private final QuestionRepository questionRepository;

    private final UserRepository userRepository;

    private final ResultRepository resultRepository;

    public TestingService(TestingRepository testingRepository, AnswerRepository answerRepository, QuestionRepository questionRepository, UserRepository userRepository, ResultRepository resultRepository) {
        this.testingRepository = testingRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.resultRepository = resultRepository;
    }

    // NOTE: haven't configure delete the questions or answers.
    public Testing save(AdminTestingDTO testingDTO) {
        log.debug("Request to save Testing : {}", testingDTO);
        Testing testing = testingRepository.save(new Testing()
            .id(testingDTO.getId())
            .name(testingDTO.getName())
            .type(testingDTO.getType())
            .testTime(testingDTO.getTestTime())
            .size(testingDTO.getSize()));

        // Delete old questions when admin remove it
        testing.getQuestions().clear();

        testingDTO
            .getQuestions()
            .stream()
            .forEach(createQuestionDTO -> {
                Question question = questionRepository
                    .save(new Question()
                        .id(createQuestionDTO.getId())
                        .content(createQuestionDTO.getContent())
                        .testing(testing));

                // Delete old answers when admin remove it
                question.getAnswers().clear();

                createQuestionDTO.getAnswers()
                    .stream()
                    .forEach(createAnswerDTO -> {
                        Answer answer = new Answer()
                            .id(createAnswerDTO.getId())
                            .content(createAnswerDTO.getContent())
                            .isCorrectAnswer(createAnswerDTO.isCorrectAnswer());
                        question.addAnswers(answer);
                        answerRepository.save(answer);
                    });

                testing.addQuestions(question);
                questionRepository.save(question);
            });
        return testingRepository.save(testing);
    }


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
        result.user(userRepository.findOneByEmailIgnoreCase(SecurityUtils.getCurrentUserLogin()).get());
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


    public void deleteTest(Long id) {
        testingRepository.deleteById(id);
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
