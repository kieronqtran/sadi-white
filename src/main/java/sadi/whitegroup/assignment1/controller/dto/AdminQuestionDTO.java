package sadi.whitegroup.assignment1.controller.dto;

import sadi.whitegroup.assignment1.entity.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AdminQuestionDTO {

    private Long id;

    private String content;

    private List<AdminAnswerDTO> answers = new ArrayList<>();

    public AdminQuestionDTO() {    }

    public AdminQuestionDTO(Long id, String content, List<AdminAnswerDTO> answers) {
        this.id = id;
        this.content = content;
        this.answers = answers;
    }

    public AdminQuestionDTO(Question question) {
        this(question.getId(),
            question.getContent(),
            question.getAnswers()
                .stream().map(AdminAnswerDTO::new)
                .collect(Collectors.toList()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public List<AdminAnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AdminAnswerDTO> answers) {
        this.answers = answers;
    }

}
