package com.calmmind.backend.strategy;
import java.time.LocalTime;
public interface NotificationMessage {
    int getNotificationInterval(); // in minutes
    String customizeMessage(String baseMessage);
    boolean shouldSendNotification(LocalTime currentTime); // based on certain conditions
}
