package com.calmmind.backend.model;
import com.calmmind.backend.strategy.NotificationMessage;
import java.time.LocalTime;

public enum AttachmentStyle implements NotificationMessage {
    
    ANXIOUS(15, 0, 0, 23, 59,
             "You may feel anxious about relationships because past experiences taught you that love is unpredictable. Your strong desire for closeness comes from a deep need for security and reassurance."), // [0]
    AVOIDANT(60, 9, 0, 17, 0,
             "You value your independence because you learned early on to rely on yourself. Getting too close might feel uncomfortable because vulnerability once felt unsafe or overwhelming."), // [1]
    SECURE(30, 0, 0, 23, 59,  
           "You feel comfortable with both intimacy and independence because you experienced consistent, responsive care. You trust that relationships can be safe and fulfilling."), // [2]
    FEARFUL_AVOIDANT(45, 10, 0, 16, 0, 
            "You want close relationships but fear getting hurt because past experiences taught you that intimacy can be both comforting and painful. This push-pull feeling is a protective response."),// [3]
    GENERAL(60, 0, 0, 23, 59, 
            "Complete the attachment style quiz to receive personalized insights and support tailored to your unique emotional needs.");  // [4]
    
    private final int notificationInterval;
    private final LocalTime startTime;
    private final LocalTime endTime;
    private final String description;
    
    AttachmentStyle(int interval, int startHour, int startMin, int endHour, int endMin, String description) {
        this.notificationInterval = interval;
        this.startTime = LocalTime.of(startHour, startMin);
        this.endTime = LocalTime.of(endHour, endMin);
        this.description = description;
    }
    
    @Override
    public int getNotificationInterval() {
        return notificationInterval;
    }
    
    @Override
    public String customizeMessage(String baseMessage) {
        return baseMessage;
    }
    
    @Override
    public boolean shouldSendNotification(LocalTime currentTime) {
        return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
    }

    public String getDescription() {
        return description;
    }
}