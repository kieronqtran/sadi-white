package sadi.whitegroup.assignment1.service.dto;

import java.util.ArrayList;
import java.util.List;

public class CreateQuestionDTO  {

    private Long id;

    private String content;

    private List<CreateAnswerDTO> answers = new ArrayList<>();

    public CreateQuestionDTO() {    }

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


    public List<CreateAnswerDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<CreateAnswerDTO> answers) {
        this.answers = answers;
    }

}
