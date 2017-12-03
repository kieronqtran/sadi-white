package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class QuestionDTO {

    private Long id;

    private String content;

    private List<AnswerDTO> answers = new ArrayList<>();

    public QuestionDTO() {    }

    public QuestionDTO(Long id, String content, List<AnswerDTO> answers) {
        this.id = id;
        this.content = content;
        this.answers = answers;
    }

    public QuestionDTO(Question question) {
        this(question.getId(),
            question.getContent(),
            question.getAnswers()
                .stream().map(AnswerDTO::new)
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


    public List<AnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerDTO> answers) {
        this.answers = answers;
    }

}
