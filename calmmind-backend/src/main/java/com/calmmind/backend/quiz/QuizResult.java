package com.calmmind.backend.quiz;

import com.calmmind.backend.model.AttachmentStyle;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a quiz result with enhanced classification.
 */
@Entity
@Table(name = "quiz_results")
public class QuizResult extends Quiz {
    
    @Column(nullable = false)
    private Double anxietyScore;
    
    @Column(nullable = false)
    private Double avoidanceScore;
    
    // ✅ Primary style - NOT NULL
    @Enumerated(EnumType.STRING)
    @Column(name = "primary_style", nullable = false, length = 50)
    private AttachmentStyle primaryStyle;
    
    // ✅ Secondary style - NULLABLE (different column name!)
    @Enumerated(EnumType.STRING)
    @Column(name = "secondary_style", length = 50)
    private AttachmentStyle secondaryStyle;
    
    // ✅ Confidence score
    @Column(nullable = false)
    private Double confidence = 100.0;
    @Column(nullable = false)
    private Double insecurityIndex;
    
    // ✅ Timestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ Default constructor
    public QuizResult() {}
    
    // ✅ Full constructor (fixed syntax)
    public QuizResult(
        Long userId, 
        Double anxietyScore, 
        Double avoidanceScore, 
        AttachmentStyle primaryStyle,
        AttachmentStyle secondaryStyle,
        Double confidence,
        Double insecurityIndex
    ) {
        super(userId);
        this.anxietyScore = anxietyScore;
        this.avoidanceScore = avoidanceScore;
        this.primaryStyle = primaryStyle;
        this.secondaryStyle = secondaryStyle;
        this.confidence = confidence;
        this.insecurityIndex = insecurityIndex;
    }
    
    // ✅ Backward compatible constructor (fixed syntax)
    public QuizResult(
        Long userId, 
        Double anxietyScore, 
        Double avoidanceScore,
        AttachmentStyle primaryStyle
    ) {
        this(userId, anxietyScore, avoidanceScore, primaryStyle, null, 100.0, 0.0);
    }

    // ============= GETTERS AND SETTERS =============
    
    public Double getAnxietyScore() {
        return anxietyScore;
    }
    
    public void setAnxietyScore(Double anxietyScore) {
        this.anxietyScore = anxietyScore;
    }
    
    public Double getAvoidanceScore() {
        return avoidanceScore;
    }
    
    public void setAvoidanceScore(Double avoidanceScore) {
        this.avoidanceScore = avoidanceScore;
    }
    
    public AttachmentStyle getPrimaryStyle() {
        return primaryStyle;
    }
    
    public void setPrimaryStyle(AttachmentStyle primaryStyle) {
        this.primaryStyle = primaryStyle;
    }
    
    public AttachmentStyle getSecondaryStyle() {
        return secondaryStyle;
    }
    
    public void setSecondaryStyle(AttachmentStyle secondaryStyle) {
        this.secondaryStyle = secondaryStyle;
    }
    
    public Double getConfidence() {
        return confidence;
    }
    
    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Double getInsecurityIndex() {
        return insecurityIndex;
    }

    public void setInsecurityIndex(Double insecurityIndex) {
        this.insecurityIndex = insecurityIndex;
    }
    
    // ============= HELPER METHODS =============
    
    /**
     * Check if this is a borderline case (confidence < 75%)
     */
    public boolean isBorderline() {
        return confidence != null && confidence < 75.0;
    }
    
    /**
     * Check if there's a secondary style tendency
     */
    public boolean hasSecondaryStyle() {
        return secondaryStyle != null;
    }
    
    // ============= VALIDATION =============
    
    /**
     * Validates that the quiz result is structurally valid.
     * Uses NEW research-validated thresholds (4.2 / 2.9)
     */
    @Override
    public boolean validate() {

        // 1. Scores must be valid 1–7
        if (anxietyScore == null || anxietyScore < 1.0 || anxietyScore > 7.0) return false;
        if (avoidanceScore == null || avoidanceScore < 1.0 || avoidanceScore > 7.0) return false;

        // 2. Primary style must exist
        if (primaryStyle == null) return false;

        // 3. Confidence must be 50–100
        if (confidence == null || confidence < 50.0 || confidence > 100.0) return false;

        // 4. Insecurity Index must be valid
        if (insecurityIndex == null || insecurityIndex < 0.0 || insecurityIndex > 100.0) return false;

        // 5. Secondary style may be null — no validation needed

        return true; // ✔ structurally valid
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("QuizResult{");
        sb.append("userId=").append(getUserId());
        sb.append(", anxietyScore=").append(String.format("%.2f", anxietyScore));
        sb.append(", avoidanceScore=").append(String.format("%.2f", avoidanceScore));
        sb.append(", primaryStyle=").append(primaryStyle);
        if (secondaryStyle != null) {
            sb.append(", secondaryStyle=").append(secondaryStyle);
        }
        sb.append(", confidence=").append(String.format("%.1f%%", confidence));
        sb.append("}");
        return sb.toString();
    }
}