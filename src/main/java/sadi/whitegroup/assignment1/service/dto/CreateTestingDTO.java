package sadi.whitegroup.assignment1.service.dto;

import java.util.ArrayList;
import java.util.List;
import  sadi.whitegroup.assignment1.service.dto.CreateQuestionDTO;;


public class CreateTestingDTO {
    private long id;

    private String name;

    private String type;

    private Long testTime;

    private int size;

    private List<CreateQuestionDTO> questions = new ArrayList<>();

    public CreateTestingDTO() {}

    public CreateTestingDTO(long id, String name, String type, Long testTime, int size, List<CreateQuestionDTO> questions) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.testTime = testTime;
        this.size = size;
        this.questions = questions;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getTestTime() {
        return testTime;
    }

    public void setTestTime(Long testTime) {
        this.testTime = testTime;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<CreateQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<CreateQuestionDTO> questions) {
        this.questions = questions;
    }
}
