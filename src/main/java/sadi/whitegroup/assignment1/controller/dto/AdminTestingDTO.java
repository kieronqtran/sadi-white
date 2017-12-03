package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.Testing;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


public class AdminTestingDTO {
    private Long id;

    private String name;

    private String type;

    private Long testTime;

    private int size;

    private List<AdminQuestionDTO> questions = new ArrayList<>();

    public AdminTestingDTO() {}

    public AdminTestingDTO(long id, String name, String type, Long testTime, int size, List<AdminQuestionDTO> questions) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.testTime = testTime;
        this.size = size;
        this.questions = questions;
    }

    public AdminTestingDTO(Testing testing) {
        this(testing.getId(),
            testing.getName(),
            testing.getType(),
            testing.getTestTime(),
            testing.getSize(),
            testing.getQuestions()
            .stream()
            .map(AdminQuestionDTO::new)
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

    public List<AdminQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AdminQuestionDTO> questions) {
        this.questions = questions;
    }
}
