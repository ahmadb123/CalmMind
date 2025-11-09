package com.calmmind.backend.quiz;

import com.calmmind.backend.model.AttachmentStyle;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
 * Entity representing a quiz result.
 */
@Entity
@Table(name = "quiz_results")
public class QuizResult extends Quiz {
    /*
     *  anxietyScore (own field - must be 1.0-7.0)
        - avoidanceScore (own field - must be 1.0-7.0)
        - attachmentStyle (own field - must not be null)
     */
    private Double anxietyScore;
    private Double avoidanceScore;
    private AttachmentStyle attachmentStyle;

    public QuizResult(){}
    
    public QuizResult(Long userId, Double anxietyScore, Double avoidanceScore, AttachmentStyle attachmentStyle){
        super(userId);
        this.anxietyScore = anxietyScore;
        this.avoidanceScore = avoidanceScore;
        this.attachmentStyle = attachmentStyle;
    }

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

    public AttachmentStyle getAttachmentStyle() {
        return attachmentStyle;
    }

    public void setAttachmentStyle(AttachmentStyle attachmentStyle) {
        this.attachmentStyle = attachmentStyle;
    }

    /*
     * Validation Rules:
        Check 1: Anxiety score is valid

        Must be between 1.0 and 7.0
        Can't be negative, 0, or > 7

        Check 2: Avoidance score is valid

        Must be between 1.0 and 7.0

        Check 3: Attachment style is not null

        Must have a determined style

        Check 4: Scores match style (optional - extra validation)

        If style is SECURE, both scores should be < 3.5
        If style is ANXIOUS, anxiety should be >= 3.5
     */
    @Override 
    public boolean validate(){
        if(this.anxietyScore < 1.0 || this.anxietyScore > 7.0){
            return false;
        }
        if(this.avoidanceScore < 1.0 || this.avoidanceScore > 7.0){
            return false;
        }
        if(this.attachmentStyle == null){
            return false;
        }
        // Optional check
        if(this.attachmentStyle == AttachmentStyle.SECURE){
            if(this.anxietyScore >= 3.5 || this.avoidanceScore >= 3.5){
                return false;
            }
        }
        if(this.attachmentStyle == AttachmentStyle.ANXIOUS){
            if(this.anxietyScore < 3.5){
                return false;
            }
        }
        if(this.attachmentStyle == AttachmentStyle.AVOIDANT){
            if(this.avoidanceScore < 3.5){
                return false;
            }
        }
        if(this.attachmentStyle == AttachmentStyle.FEARFUL_AVOIDANT){
            if(this.anxietyScore < 3.5 || this.avoidanceScore < 3.5){
                return false;
            }
        }
        return true;
    }
}