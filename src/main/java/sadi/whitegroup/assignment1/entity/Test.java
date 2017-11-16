package sadi.whitegroup.assignment1.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "test", schema = "public")
public class Test {

    @Id
    @Column
    private Long id;

    @Column
    private String type;

    @Column
    private String name;

    @Column
    // number of questions
    private int size;

    @Column(name = "test_time")
    // Store time in  milliseconds
    private Long testTime;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test")
    private List<Question> questionList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test")
    private List<Result> resultList = new ArrayList<>();

    public Test() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Long getTestTime() {
        return testTime;
    }

    public void setTestTime(Long testTime) {
        this.testTime = testTime;
    }

    public List<Question> getQuestionList() {
        return questionList;
    }

    public void setQuestionList(List<Question> questionList) {
        this.questionList = questionList;
    }
}
