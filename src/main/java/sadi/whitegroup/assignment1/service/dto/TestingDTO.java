package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Testing;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class TestingDTO {
    private Long id;

    private String name;

    private String type;

    private Long testTime;

    private int size;

    private List<QuestionDTO> questions = new ArrayList<>();

    public TestingDTO() {}

    public TestingDTO(long id, String name, String type, Long testTime, int size, List<QuestionDTO> questions) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.testTime = testTime;
        this.size = size;
        this.questions = questions;
    }

    public TestingDTO(Testing testing) {
        this(testing.getId(),
            testing.getName(),
            testing.getType(),
            testing.getTestTime(),
            testing.getSize(),
            testing.getQuestions()
            .stream()
            .map(QuestionDTO::new)
            .collect(Collectors.toList()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }
}
