package com.calmmind.backend.dto;

import com.calmmind.backend.model.AttachmentStyle;

public class QuizResultDTO {
    private Long userId;
    private String attachmentStyle;
    private String description; 
    private Double anxietyScore;
    private Double avoidanceScore;

    // ✅ Constructor accepts AttachmentStyle enum
    public QuizResultDTO(Long userId, AttachmentStyle attachmentStyle, Double anxietyScore, Double avoidanceScore) {
        this.userId = userId;
        this.attachmentStyle = attachmentStyle.name();  // Extract name from enum
        this.description = attachmentStyle.getDescription();  // Extract description from enum
        this.anxietyScore = anxietyScore;
        this.avoidanceScore = avoidanceScore;
    }

    // Default constructor
    public QuizResultDTO() {}

    // Getters
    public Long getUserId() {
        return userId;
    }

    public String getAttachmentStyle() {
        return attachmentStyle;
    }

    public String getDescription() {
        return description;
    }

    public Double getAnxietyScore() {
        return anxietyScore;
    }

    public Double getAvoidanceScore() {
        return avoidanceScore;
    }
}