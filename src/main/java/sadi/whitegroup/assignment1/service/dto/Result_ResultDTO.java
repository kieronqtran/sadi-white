package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.User;

import java.util.List;

public class Result_ResultDTO {
    private long id;

    private int numberOfCorrectAnswer;

    private String testName;

    private int size;

    private String firstName;

    private String lastName;

    public Result_ResultDTO() {}

    public Result_ResultDTO(long id, int numberOfCorrectAnswer, String testName, int size,
                            String firstName, String lastName) {
        this.id = id;
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
        this.testName = testName;
        this.size = size;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Result_ResultDTO(Result result){
        this(result.getId(), result.getNumberOfCorrectAnswer(),
            result.getTesting().getName(), result.getTesting().getSize(),
            result.getUser().getFirstName(),result.getUser().getLastName());
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public int getNumberOfCorrectAnswer() {
        return numberOfCorrectAnswer;
    }
    public void setNumberOfCorrectAnswer(int numberOfCorrectAnswer) {
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
    }
    public String getTestName() {
        return testName;
    }
    public void setTestName(String testName) {
        this.testName = testName;
    }
    public int getSize() {
        return size;
    }
    public void setSize(int size) {
        this.size = size;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
