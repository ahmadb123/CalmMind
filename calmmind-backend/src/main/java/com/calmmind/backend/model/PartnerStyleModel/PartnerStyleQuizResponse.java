package com.calmmind.backend.model.PartnerStyleModel;

import jakarta.persistence.*;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
@Entity
@Table(name = "partner_style_quiz_response")
public class PartnerStyleQuizResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private PartnerStyleQuizQuestion question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer answerValue;

    public PartnerStyleQuizResponse() {}

    public PartnerStyleQuizResponse(
        PartnerStyleQuizQuestion question,
        User user,
        Integer answerValue
    ) {
        this.question = question;
        this.user = user;
        this.answerValue = answerValue;
    }

    /* Getters Setters */

    public Long getId() {
        return id;
    }

    public PartnerStyleQuizQuestion getQuestion() {
        return question;
    }

    public void setQuestion(PartnerStyleQuizQuestion question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getAnswerValue() {
        return answerValue;
    }

    public void setAnswerValue(Integer answerValue) {
        this.answerValue = answerValue;
    }
}
