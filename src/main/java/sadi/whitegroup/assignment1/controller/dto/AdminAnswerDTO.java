package sadi.whitegroup.assignment1.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import sadi.whitegroup.assignment1.entity.Answer;

/**
 * A Answer.
 */
public class AdminAnswerDTO {

    private Long id;

    private String content;

    private Boolean isCorrectAnswer;

    public AdminAnswerDTO() {
    }

    public AdminAnswerDTO(Long id, String content, Boolean isCorrectAnswer) {
        this.id = id;
        this.content = content;
        this.isCorrectAnswer = isCorrectAnswer;
    }

    public AdminAnswerDTO(Answer answer) {
        this(answer.getId(), answer.getContent(), answer.isCorrectAnswer());
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

    @JsonProperty("isCorrectAnswer")
    public Boolean isCorrectAnswer() {
        return isCorrectAnswer;
    }

    @JsonProperty("isCorrectAnswer")
    public void setIsCorrectAnswer(Boolean isCorrectAnswer) {
        this.isCorrectAnswer = isCorrectAnswer;
    }
}
