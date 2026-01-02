package com.calmmind.backend.model.UserAttachmentStyle;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import com.calmmind.backend.model.User;

@Entity 
@Table(name = "user_style_quiz_results")
public class UserStyleQuizResults{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer scoreA;

    @Column(nullable = false)
    private Integer scoreB;

    @Column(nullable = false)
    private Integer scoreC;

    @Column(nullable = false, length = 1)
    private String dominantStyle; // "A", "B", or "C"

    @Column(columnDefinition = "TEXT")
    private String scoringKeyDesc;

    @Column(nullable = false)
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate(){
        completedAt = LocalDateTime.now();
    }
    public UserStyleQuizResults() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getScoreA() {
        return scoreA;
    }

    public void setScoreA(Integer scoreA) {
        this.scoreA = scoreA;
    }

    public Integer getScoreB() {
        return scoreB;
    }

    public void setScoreB(Integer scoreB) {
        this.scoreB = scoreB;
    }

    public Integer getScoreC() {
        return scoreC;
    }

    public void setScoreC(Integer scoreC) {
        this.scoreC = scoreC;
    }

    public String getDominantStyle() {
        return dominantStyle;
    }

    public void setDominantStyle(String dominantStyle) {
        this.dominantStyle = dominantStyle;
    }

    public String getScoringKeyDesc() {
        return scoringKeyDesc;
    }

    public void setScoringKeyDesc(String scoringKeyDesc) {
        this.scoringKeyDesc = scoringKeyDesc;
    }

    public LocalDateTime getCompletedAt(){
        return completedAt;
    }

}