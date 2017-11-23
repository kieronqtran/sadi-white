package sadi.whitegroup.assignment1.service;

import sadi.whitegroup.assignment1.entity.Question;
import sadi.whitegroup.assignment1.repository.QuestionRepository;

/**
 * Created by 전소연 on 11/17/2017.
 */
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

//    public Question getById() {
//
//    }

    public void saveQuestion(Question question) {
        questionRepository.save(question);
    }

    public void deleteQuesiton(Question question) {
        questionRepository.delete(question);
    }
}
