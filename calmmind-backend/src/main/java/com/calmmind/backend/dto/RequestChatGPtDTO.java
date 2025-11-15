package com.calmmind.backend.dto;

import java.util.List;

public class RequestChatGPtDTO{
    private String model;
    private List<Message> messages;

    public RequestChatGPtDTO(){}

    public RequestChatGPtDTO(String model, List<Message> messages){
        this.model = model;
        this.messages = messages;
    }

    // Getters and Setters

    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }
    public List<Message> getMessages() {
        return messages;
    }
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    // inner class
    public static class Message{
        private String role;   // "user", "assistant", "system"
        private String content;

        public Message() {}

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
