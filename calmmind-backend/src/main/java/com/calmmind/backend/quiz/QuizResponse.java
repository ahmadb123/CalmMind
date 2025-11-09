package com.calmmind.backend.quiz;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * Entity representing a quiz response.
 */
@Entity
@Table(name = "quiz_responses")
public class QuizResponse extends Quiz {
    private Long questionId;
    private Integer questionAnswer;

    public QuizResponse(){}

    public QuizResponse(Long userId, Long questionId, Integer questionAnswer){
        super(userId);
        this.questionId = questionId;
        this.questionAnswer = questionAnswer;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Integer getQuestionAnswer() {
        return questionAnswer;
    }

    public void setQuestionAnswer(Integer questionAnswer) {
        this.questionAnswer = questionAnswer;
    }

    // Ensure the data is structurally valid before saving to database or using it
    /*
     * Validation Rules:
        Check 1: Answer is in valid range

        Answer must be between 1 and 7
        Can't be 0, 8, 100, -5, etc.

        Check 2: Answer is not null

        Must have an answer

        Check 3: QuestionId is valid (optional)

        QuestionId must be between 1-12
     */
    @Override
    public boolean validate(){
        if(this.questionAnswer < 1 || this.questionAnswer > 7){
            return false;
        }
        if(this.questionAnswer == null){
            return false;
        }
        if(this.questionId < 1 || this.questionId > 12){
            return false;
        }
        return true;
    }
}