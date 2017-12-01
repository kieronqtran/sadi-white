package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Question;
import sadi.whitegroup.assignment1.entity.Result;
import sadi.whitegroup.assignment1.entity.Testing;
import sadi.whitegroup.assignment1.entity.User;

import java.util.List;
import java.util.Set;


public class ResultDTO {
	private long id;

	private int numberOfCorrectAnswer;

	private String testName;

	private int size;

//	private User user; // we only return for one user

	public ResultDTO() {}

	public ResultDTO(long id, int numberOfCorrectAnswer, String testName, int size) {
		this.id = id;
		this.numberOfCorrectAnswer = numberOfCorrectAnswer;
		this.testName = testName;
		this.size = size;
	}

	public ResultDTO(Result result){
		this(result.getId(), result.getNumberOfCorrectAnswer(), 
				  result.getTesting().getName(), result.getTesting().getSize());
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
}

