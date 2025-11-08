package com.calmmind.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity 
@Table(name = "affirmations")
/*
 * - id
    - message
    - attachment_style (ANXIOUS, AVOIDANT, SECURE, FEARFUL_AVOIDANT, GENERAL)
    - category (DAILY, RELATIONSHIP, CALM, ENCOURAGEMENT)
    - created_at
 */
public class Affirmation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(name = "attachment_style", nullable = false, length = 50)
    private AttachmentStyle attachmentStyle;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Affirmation() {}

    public Affirmation(String message, AttachmentStyle attachmentStyle, String category) {
        this.message = message;
        this.attachmentStyle = attachmentStyle;
        this.category = category;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public AttachmentStyle getAttachmentStyle() {
        return attachmentStyle;
    }
    public void setAttachmentStyle(AttachmentStyle attachmentStyle) {
        this.attachmentStyle = attachmentStyle;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
