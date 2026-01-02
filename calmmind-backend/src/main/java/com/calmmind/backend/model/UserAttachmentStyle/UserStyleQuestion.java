package com.calmmind.backend.model.UserAttachmentStyle;

import jakarta.persistence.*;

@Entity
@Table(name = "user_style_question")
public class UserStyleQuestion{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AnswerOptions options;

    @Column(columnDefinition = "TEXT")
    private String scoringKeyDesc;

    public UserStyleQuestion(){}

    public UserStyleQuestion(AnswerOptions options, String scoringKeyDesc){
        this.options = options;
        this.scoringKeyDesc = scoringKeyDesc;
    }

    public Long getId(){
        return id;
    }

    public AnswerOptions getOptions(){
        return options;
    }

    public void setOptions(AnswerOptions options) {  
        this.options = options;
    }

    public String getScoringKeyDesc(){
        return scoringKeyDesc;
    }

    public void setScoringKeyDesc(String scoringKeyDesc){
        this.scoringKeyDesc = scoringKeyDesc;
    }

    public enum AnswerOptions{
        A,
        B,
        C
    }

}