package sadi.whitegroup.assignment1.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "result", schema = "public")
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column
    private
    int numberOfCorrectAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "test_id", nullable = false)
    private Test test;

    public Result() {
    }

    public Result(Long id, int numberOfCorrectAnswer, User user, Test test){
        this.id = id;
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
        this.user = user;
        this.test = test;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumberOfCorrectAnswer() {
        return numberOfCorrectAnswer;
    }

    public void setNumberOfCorrectAnswer(int numberOfCorrectAnswer) {
        this.numberOfCorrectAnswer = numberOfCorrectAnswer;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }
}
