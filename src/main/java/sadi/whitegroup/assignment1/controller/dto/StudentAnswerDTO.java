package sadi.whitegroup.assignment1.controller.dto;

import java.util.List;

/**
 * Created by 전소연 on 11/17/2017.
 */
public class StudentAnswerDTO {
    private Long testId;
    private Long studentId;
    private List<Long> answerId;
    private int mark;



    public StudentAnswerDTO() {
    }

    public Long getTestId() {
        return testId;
    }

    public void setTestId(Long testId) {
        this.testId = testId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public List<Long> getAnswerId() {
        return answerId;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }


}
