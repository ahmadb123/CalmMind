package com.calmmind.backend.dto;

import com.calmmind.backend.model.AttachmentStyle;

public class QuizResultDTO {
    private Long userId;
    private String primaryStyle;           // ✅ Renamed from attachmentStyle
    private String primaryDescription;     // Description of primary style
    private String secondaryStyle;         // ✅ NEW
    private String secondaryDescription;   // ✅ NEW - Description of secondary style
    private Double anxietyScore;
    private Double avoidanceScore;
    private Double confidence;             // ✅ NEW
    private Boolean isBorderline;          // ✅ NEW

    // ✅ Enhanced constructor with all fields
    public QuizResultDTO(
        Long userId, 
        AttachmentStyle primaryStyle,
        AttachmentStyle secondaryStyle,
        Double anxietyScore, 
        Double avoidanceScore,
        Double confidence,
        Boolean isBorderline
    ) {
        this.userId = userId;
        this.primaryStyle = primaryStyle.name();
        this.primaryDescription = primaryStyle.getDescription();
        
        // Handle nullable secondary style
        if (secondaryStyle != null) {
            this.secondaryStyle = secondaryStyle.name();
            this.secondaryDescription = secondaryStyle.getDescription();
        } else {
            this.secondaryStyle = null;
            this.secondaryDescription = null;
        }
        
        this.anxietyScore = anxietyScore;
        this.avoidanceScore = avoidanceScore;
        this.confidence = confidence;
        this.isBorderline = isBorderline;
    }

    // ✅ Backward compatible constructor (for old code)
    @Deprecated
    public QuizResultDTO(
        Long userId, 
        AttachmentStyle attachmentStyle, 
        Double anxietyScore, 
        Double avoidanceScore
    ) {
        this(userId, attachmentStyle, null, anxietyScore, avoidanceScore, 100.0, false);
    }

    // Default constructor
    public QuizResultDTO() {}

    // ============= GETTERS =============
    
    public Long getUserId() {
        return userId;
    }

    public String getPrimaryStyle() {
        return primaryStyle;
    }

    public String getPrimaryDescription() {
        return primaryDescription;
    }

    public String getSecondaryStyle() {
        return secondaryStyle;
    }

    public String getSecondaryDescription() {
        return secondaryDescription;
    }

    public Double getAnxietyScore() {
        return anxietyScore;
    }

    public Double getAvoidanceScore() {
        return avoidanceScore;
    }

    public Double getConfidence() {
        return confidence;
    }

    public Boolean getIsBorderline() {
        return isBorderline;
    }
    
    // Alias for isBorderline (common naming convention)
    public Boolean isBorderline() {
        return isBorderline;
    }

    // ============= SETTERS =============
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setPrimaryStyle(String primaryStyle) {
        this.primaryStyle = primaryStyle;
    }

    public void setPrimaryDescription(String primaryDescription) {
        this.primaryDescription = primaryDescription;
    }

    public void setSecondaryStyle(String secondaryStyle) {
        this.secondaryStyle = secondaryStyle;
    }

    public void setSecondaryDescription(String secondaryDescription) {
        this.secondaryDescription = secondaryDescription;
    }

    public void setAnxietyScore(Double anxietyScore) {
        this.anxietyScore = anxietyScore;
    }

    public void setAvoidanceScore(Double avoidanceScore) {
        this.avoidanceScore = avoidanceScore;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public void setIsBorderline(Boolean isBorderline) {
        this.isBorderline = isBorderline;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("QuizResultDTO{");
        sb.append("userId=").append(userId);
        sb.append(", primaryStyle='").append(primaryStyle).append('\'');
        if (secondaryStyle != null) {
            sb.append(", secondaryStyle='").append(secondaryStyle).append('\'');
        }
        sb.append(", anxietyScore=").append(anxietyScore);
        sb.append(", avoidanceScore=").append(avoidanceScore);
        sb.append(", confidence=").append(confidence);
        sb.append(", isBorderline=").append(isBorderline);
        sb.append('}');
        return sb.toString();
    }
}