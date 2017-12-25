package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.User;

import java.time.Instant;
import java.util.Date;
import java.util.List;

public class Result_ResultDTO {

    private Long resultId;

    private int numberOfCorrectAnswer;

    private String testName;

    private int size;

    private String firstName;

    private String lastName;

    private Instant createDate;

    public Result_ResultDTO() {}

    public Result_ResultDTO(Long resultId, int numberOfCorrectAnswer, String testName, int size,
                            String firstName, String lastName, Instant createDate) {
        this.resultId = resultId;
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
        this.testName = testName;
        this.size = size;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createDate = createDate;
    }

    public Result_ResultDTO(Result result){
        this(result.getId(), result.getNumberOfCorrectAnswer(),
            result.getTesting().getName(), result.getTesting().getSize(),
            result.getUser().getFirstName(),result.getUser().getLastName(),
            result.getCreatedDate());
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

	/**
	 * @return the createDate
	 */
	public Instant getCreateDate() {
		return createDate;
	}

	/**
	 * @return the resultId
	 */
	public Long getResultId() {
		return resultId;
	}

	/**
	 * @param resultId the resultId to set
	 */
	public void setResultId(Long resultId) {
		this.resultId = resultId;
	}

}
