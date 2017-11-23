package sadi.whitegroup.assignment1.service;

import sadi.whitegroup.assignment1.entity.Answer;
import sadi.whitegroup.assignment1.repository.AnswerRepository;

/**
 * Created by 전소연 on 11/17/2017.
 */
public class AnswerService {
    private final AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public void saveAnswer(Answer answer) {
        answerRepository.save(answer);
    }

    public void deleteAnswer(Answer answer) {
        answerRepository.delete(answer);
    }
}
