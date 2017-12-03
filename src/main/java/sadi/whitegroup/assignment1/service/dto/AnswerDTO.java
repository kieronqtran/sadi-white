package sadi.whitegroup.assignment1.service.dto;

import sadi.whitegroup.assignment1.entity.Answer;

/**
 * A Answer.
 */
public class AnswerDTO {

    private Long id;

    private String content;

    public AnswerDTO() {
    }

    public AnswerDTO(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public AnswerDTO(Answer answer) {
        this(answer.getId(), answer.getContent());
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

}
