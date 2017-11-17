package sadi.whitegroup.assignment1.service;

import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.repository.ResultRepository;

/**
 * Created by 전소연 on 11/17/2017.
 */
public class ResultService {
    private final ResultRepository resultRepository;

    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public void saveReult(Result result) {
        resultRepository.save(result);
    }
}
