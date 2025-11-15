package com.calmmind.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reminders_and_notes")
public class RemindersAndNotes {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId; 
    private String thoughts;
    private LocalDateTime createdAt; 
    @Enumerated(EnumType.STRING)
    private SetOptions setOptions;
    
    @Enumerated(EnumType.STRING)
    private WhenOptions whenOptions;
    
    @Enumerated(EnumType.STRING)
    private FrequentAndTimingOptions frequentAndTimingOptions;
    
    @Enumerated(EnumType.STRING)
    private Timing timing;
    
    private LocalDateTime reminderDateTime;

    // Default constructor
    public RemindersAndNotes() {}

    // Constructor
    public RemindersAndNotes(Long userId, String thoughts, LocalDateTime createdAt, 
                            SetOptions setOptions, WhenOptions whenOptions, 
                            FrequentAndTimingOptions frequentAndTimingOptions, 
                            Timing timing, LocalDateTime reminderDateTime) {
        this.userId = userId;
        this.thoughts = thoughts;
        this.createdAt = createdAt;
        this.setOptions = setOptions;
        this.whenOptions = whenOptions;
        this.frequentAndTimingOptions = frequentAndTimingOptions;
        this.timing = timing;
        this.reminderDateTime = reminderDateTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getThoughts() {
        return thoughts;
    }

    public void setThoughts(String thoughts) {
        this.thoughts = thoughts;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public SetOptions getSetOptions() {
        return setOptions;
    }

    public void setSetOptions(SetOptions setOptions) {
        this.setOptions = setOptions;
    }

    public WhenOptions getWhenOptions() {
        return whenOptions;
    }

    public void setWhenOptions(WhenOptions whenOptions) {
        this.whenOptions = whenOptions;
    }

    public FrequentAndTimingOptions getFrequentAndTimingOptions() {
        return frequentAndTimingOptions;
    }

    public void setFrequentAndTimingOptions(FrequentAndTimingOptions frequentAndTimingOptions) {
        this.frequentAndTimingOptions = frequentAndTimingOptions;
    }

    public Timing getTiming() {
        return timing;
    }

    public void setTiming(Timing timing) {
        this.timing = timing;
    }

    public LocalDateTime getReminderDateTime() {
        return reminderDateTime;
    }

    public void setReminderDateTime(LocalDateTime reminderDateTime) {
        this.reminderDateTime = reminderDateTime;
    }

    // Enums - removed 'static' keyword
    public enum SetOptions {
        EVERYDAY,
        WEEKDAYS,
        WEEKENDS,
        CUSTOM
    }

    public enum WhenOptions {
        MORNING,      // 6am-12pm
        AFTERNOON,    // 12pm-5pm
        EVENING,      // 5pm-8pm
        NIGHT         // 8pm-12am
    }

    public enum FrequentAndTimingOptions {
        ONCE,
        TWICE,
        THRICE
    }

    public enum Timing {
        SPECIFIC_TIME,
        FLEXIBLE_TIME
    }
}