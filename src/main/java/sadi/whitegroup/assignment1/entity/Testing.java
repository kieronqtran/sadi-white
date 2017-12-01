package sadi.whitegroup.assignment1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

/**
 * A Testing.
 */
@Entity
@Table(name = "testing")
public class Testing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "test_time")
    private Long testTime;

    @Column(name = "size")
    private int size;

    @OneToMany(mappedBy = "testing", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Question> questions = new ArrayList();

    @OneToMany(mappedBy = "testing", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Result> results = new HashSet<>();


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

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public Testing name(String name) {
        this.name = name;
        return this;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public Testing type(String type) {
        this.type = type;
        return this;
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

    public Testing testtime(Long testtime) {
        this.testTime = testtime;
        return this;
    }
    public List<Question> getQuestions() {
        return questions;
    }

    public Testing questions(List<Question> questions) {
        this.questions = questions;
        return this;
    }
    public Testing addQuestions(Question question) {
        this.questions.add(question);
        question.setTesting(this);
        return this;
    }
    public Testing removeQuestions(Question question) {
        this.questions.remove(question);
        question.setTesting(null);
        return this;
    }
    public Set<Result> getResults() {
        return results;
    }
    public void setResults(Set<Result> results) {
        this.results = results;
    }
    public Testing results(Set<Result> results) {
        this.results = results;
        return this;
    }
    public Testing addResults(Result result) {
        this.results.add(result);
        result.setTesting(this);
        return this;
    }
    public Testing removeResults(Result result) {
        this.results.remove(result);
        result.setTesting(null);
        return this;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Testing testing = (Testing) o;
        if (testing.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testing.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Testing{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", testTime='" + getTestTime() + "'" +
            "}";
    }
}
