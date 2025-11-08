package com.calmmind.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;
    
    @Column(unique = true, nullable = false, length = 100)
    private String email;
    
    @Column(nullable = false)
    private String password; 
    
    @Enumerated(EnumType.STRING) 
    @Column(nullable = false)
    private AttachmentStyle attachmentStyle;
    
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    // Constructor for creating new users
    public User(String username, String email, String password, AttachmentStyle attachmentStyle) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.attachmentStyle = attachmentStyle;
    }

    // Getters and Setters
    public Long getId() {
        return id; 
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    // Simple setter - validation happens in service layer
    public void setPassword(String password) {
        this.password = password;
    }
    
    public AttachmentStyle getAttachmentStyle() {
        return attachmentStyle;
    }
    
    public void setAttachmentStyle(AttachmentStyle attachmentStyle) {
        this.attachmentStyle = attachmentStyle;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", email='" + email + '\'' +
            ", attachmentStyle=" + attachmentStyle +
            ", createdAt=" + createdAt +
            '}';
    }
}