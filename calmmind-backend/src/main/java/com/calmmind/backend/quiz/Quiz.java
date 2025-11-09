package com.calmmind.backend.quiz;

import java.time.LocalDate;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * Main quiz abstract class:
 * Quiz template.
 */
@MappedSuperclass
public abstract class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id; 
    @Column(nullable = false)
    protected Long userId;
    @Column(name = "created_at")
    protected LocalDateTime createdAt = LocalDateTime.now();
    // validate() abstract method 
    public abstract boolean validate();

    public Quiz(){}

    public Quiz(long userId){
        this.userId = userId;
    }
    // getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public LocalDateTime getDateTaken() {
        return createdAt;
    }
    public void setDateTaken(LocalDateTime dateTaken) {
        this.createdAt = createdAt;
    }
}