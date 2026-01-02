package com.calmmind.backend.model.UserAttachmentStyle;



import jakarta.persistence.*;

@Entity
@Table(name = "user_style_quiz")
public class UserStyleQuiz{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_text")
    private String questionText;

    @ManyToOne
    @JoinColumn(name = "question_option_id", nullable = false)
    private UserStyleQuestion questionOptionAnswer;

    @Column(nullable = false)
    private Integer questionNum;

    public UserStyleQuiz(){}

    public UserStyleQuiz(String questionText, UserStyleQuestion questionOptionAnswer, Integer questionNum){
        this.questionText = questionText; 
        this.questionOptionAnswer = questionOptionAnswer;
        this.questionNum = questionNum;
    }

    public Long getId(){
        return id;
    }

    public String getQuestionText(){
        return questionText;
    }

    public void setQuestionText(String questionText){
        this.questionText = questionText;
    }

    public UserStyleQuestion getQuestionOptionAnswer(){
        return questionOptionAnswer;
    }

    public Integer getQuestionNum(){
        return questionNum;
    }

    public void setQuestionNume(Integer questionNum){
        this.questionNum = questionNum;
    }
}