package com.calmmind.backend.dto;

import com.calmmind.backend.model.AttachmentStyle;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private AttachmentStyle attachmentStyle;
    
    // Constructors
    public RegisterRequest() {}
    
    public RegisterRequest(String username, String email, String password, AttachmentStyle attachmentStyle) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.attachmentStyle = attachmentStyle;
    }
    
    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public AttachmentStyle getAttachmentStyle() { return attachmentStyle; }
    public void setAttachmentStyle(AttachmentStyle attachmentStyle) { this.attachmentStyle = attachmentStyle; }
}
