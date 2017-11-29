package sadi.whitegroup.assignment1.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Result.
 */
@Entity
@Table(name = "result")
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number_of_correct_answer")
    private Integer numberOfCorrectAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "testing_id", nullable = false)
    private Testing testing;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfCorrectAnswer() {
        return numberOfCorrectAnswer;
    }

    public void setNumberOfCorrectAnswer(Integer numberOfCorrectAnswer) {
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
    }

    public Result numberOfCorrectAnswer(Integer numberOfCorrectAnswer) {
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
        return this;
    }

    public Testing getTesting() {
        return testing;
    }

    public void setTesting(Testing testing) {
        this.testing = testing;
    }

    public Result testing(Testing testing) {
        this.testing = testing;
        return this;
    }

    public Result user(User user) {
        this.user = user;
        return this;
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Result result = (Result) o;
        if (result.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), result.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Result{" +
            "id=" + getId() +
            ", numberOfCorrectAnswer='" + getNumberOfCorrectAnswer() + "'" +
            "}";
    }
}
