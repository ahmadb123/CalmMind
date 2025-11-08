package com.calmmind.backend.model;

import java.time.LocalTime;

public enum AttachmentStyle implements NotificationMessage {
    
    ANXIOUS {
        @Override 
        public int getNotificationInterval() {
            return 15;
        }

        @Override 
        public String customizeMessage(String baseMessage) {
            return baseMessage;  // ← Remove the API comment
        }

        @Override
        public boolean shouldSendNotification(LocalTime currentTime) {
            return true;
        }
    },
    
    AVOIDANT {
        @Override 
        public int getNotificationInterval() {
            return 60;
        }

        @Override 
        public String customizeMessage(String baseMessage) {
            return baseMessage;
        }

        @Override
        public boolean shouldSendNotification(LocalTime currentTime) {
            return currentTime.isAfter(LocalTime.of(9, 0)) 
                && currentTime.isBefore(LocalTime.of(17, 0));
        }
    },
    
    SECURE {
        @Override 
        public int getNotificationInterval() {
            return 30;
        }

        @Override 
        public String customizeMessage(String baseMessage) {
            return baseMessage;
        }

        @Override
        public boolean shouldSendNotification(LocalTime currentTime) {
            return true;
        }
    },
    
    FEARFUL_AVOIDANT {
        @Override 
        public int getNotificationInterval() {
            return 45;
        }

        @Override 
        public String customizeMessage(String baseMessage) {
            return baseMessage;
        }

        @Override
        public boolean shouldSendNotification(LocalTime currentTime) {
            return currentTime.isAfter(LocalTime.of(10, 0)) 
                && currentTime.isBefore(LocalTime.of(16, 0));
        }
    },
    
    GENERAL {
        @Override 
        public int getNotificationInterval() {
            return 60;
        }

        @Override 
        public String customizeMessage(String baseMessage) {
            return baseMessage;
        }

        @Override
        public boolean shouldSendNotification(LocalTime currentTime) {
            return true;
        }
    }
}