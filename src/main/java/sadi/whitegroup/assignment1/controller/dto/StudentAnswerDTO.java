package sadi.whitegroup.assignment1.controller.dto;

import java.util.List;

/**
 * Created by 전소연 on 11/17/2017.
 */
public class StudentAnswerDTO {
    private Long testId;
    private List<Long> answerId;

    public StudentAnswerDTO() {
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public List<Long> getAnswerId() {
        return answerId;
    }
}
