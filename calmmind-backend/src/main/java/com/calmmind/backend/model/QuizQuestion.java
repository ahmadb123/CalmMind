package com.calmmind.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * Entity representing a quiz question.
 */
@Entity
@Table(name = "quiz_questions")
public class QuizQuestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String questionText;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuizDimension dimension;
    
    @Column(nullable = false)
    private Integer questionNumber;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    // Empty constructor (required by JPA)
    public QuizQuestion() {}
    
    // Constructor for creating questions
    public QuizQuestion(String questionText, QuizDimension dimension, Integer questionNumber) {
        this.questionText = questionText;
        this.dimension = dimension;
        this.questionNumber = questionNumber;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuestionText() {
        return questionText;
    }
    
    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
    
    public QuizDimension getDimension() {
        return dimension;
    }
    
    public void setDimension(QuizDimension dimension) {
        this.dimension = dimension;
    }
    
    public Integer getQuestionNumber() {
        return questionNumber;
    }
    
    public void setQuestionNumber(Integer questionNumber) {
        this.questionNumber = questionNumber;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
