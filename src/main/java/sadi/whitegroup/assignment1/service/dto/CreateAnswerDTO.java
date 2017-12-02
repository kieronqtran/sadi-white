package sadi.whitegroup.assignment1.service.dto;

/**
 * A Answer.
 */
public class CreateAnswerDTO {

    private Long id;

    private String content;

    private Boolean isCorrectAnswer;

    public CreateAnswerDTO () {
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

    public CreateAnswerDTO content(String content) {
        this.content = content;
        return this;
    }

    public Boolean isCorrectAnswer() {
        return isCorrectAnswer;
    }

    public CreateAnswerDTO isCorrectAnswer(Boolean isCorrectAnswer) {
        this.isCorrectAnswer = isCorrectAnswer;
        return this;
    }

    public void setIsCorrectAnswer(Boolean isCorrectAnswer) {
        this.isCorrectAnswer = isCorrectAnswer;
    }
}
