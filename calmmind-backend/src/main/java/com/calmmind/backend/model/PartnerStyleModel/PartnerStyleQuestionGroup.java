package com.calmmind.backend.model.PartnerStyleModel;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
    GROUPS A,B,C
    A - AVOIDANT QUESTIONS
    B - SECURE QUESTIONS
    C - ANXIOUS QUESTIONS
*/

@Entity 
@Table(name = "partner_style_question_groups")
public class PartnerStyleQuestionGroup{
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Groups groupName;

    @Column(name = "min_score", nullable = false)
    private Integer minScore;

    @Column(name = "max_score", nullable = false)
    private Integer maxScore;


    public PartnerStyleQuestionGroup(){}

    public PartnerStyleQuestionGroup(Groups groupName, Integer minScore, Integer maxScore) {
        this.groupName = groupName;
        this.minScore = minScore;
        this.maxScore = maxScore;
    }

    /* Getters and Setters */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Groups getGroupName() {
        return groupName;
    }

    public void setGroupName(Groups groupName) {
        this.groupName = groupName;
    }

    public Integer getMinScore() {
        return minScore;
    }

    public void setMinScore(Integer minScore) {
        this.minScore = minScore;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }

    // inner enum class
    public enum Groups {
        AVOIDANT,
        SECURE,
        ANXIOUS
    }
}