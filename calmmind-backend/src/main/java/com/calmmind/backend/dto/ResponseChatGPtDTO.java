package com.calmmind.backend.dto;
import java.util.List;

public class ResponseChatGPtDTO{
    private List<Choices> choices;
    public ResponseChatGPtDTO(){}
    public ResponseChatGPtDTO(List<Choices> choices){
        this.choices = choices;
    }
    public List<Choices> getChoices() {
        return choices;
    }
    public void setChoices(List<Choices> choices) {
        this.choices = choices;
    }
    public static class Choices{
        private Message message;
        public Choices(){}
        public Choices(Message message){
            this.message = message;
        }
        public Message getMessage() {
            return message;
        }
        public void setMessage(Message message) {
            this.message = message;
        }
        public static class Message{
            private String role;
            private String content;
            public Message(){}

            public Message(String role, String content){
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
}