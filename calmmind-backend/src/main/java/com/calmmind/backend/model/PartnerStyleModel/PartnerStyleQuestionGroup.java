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

    @Column(columnDefinition = "TEXT")
    private String scoringKeyDesc;

    public PartnerStyleQuestionGroup(){}

    public PartnerStyleQuestionGroup(Groups groupName, String scoringKeyDesc) {
        this.groupName = groupName;
        this.scoringKeyDesc = scoringKeyDesc;
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

    public String getScoringKeyDesc(){
        return scoringKeyDesc;
    }

    public void setScoringKeyDesc(String scoringKeyDesc){
        this.scoringKeyDesc = scoringKeyDesc;
    }
    // inner enum class
    public enum Groups {
        AVOIDANT,
        SECURE,
        ANXIOUS
    }
}