package com.calmmind.backend.model.UserAttachmentStyle;


import javax.annotation.processing.Generated;
import com.calmmind.backend.model.User;
import jakarta.persistence.*;

@Entity
@Table(name = "user_style_quiz_response")

public class UserStyleQuizResponse{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private UserStyleQuiz question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean answer; // this should be depending on the option A,B OR C. // The column (A/B/C) is determined by: question.getQuestionOptionAnswer().getOptions()


    public UserStyleQuizResponse(){}

    public UserStyleQuizResponse(UserStyleQuiz question, User user, boolean answer){
        this.question = question;
        this.user = user;
        this.answer = answer;
    }
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public UserStyleQuiz getQuestion() {
        return question;
    }

    public void setQuestion(UserStyleQuiz question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getAnswer() {
        return answer;
    }

    public void setAnswer(Boolean answer) {
        this.answer = answer;
    }


    
}