package com.calmmind.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    
    @OneToMany(mappedBy = "reminder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ReminderTime> reminderTimes = new ArrayList<>();

    private Boolean isActive;

    // Default constructor
    public RemindersAndNotes() {
        this.isActive = false; // Fixed: was setActive
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

    public List<ReminderTime> getReminderTimes() {
        return reminderTimes;
    }

    public void setReminderTimes(List<ReminderTime> reminderTimes) {
        this.reminderTimes = reminderTimes;
    }
    
    // Helper method to add reminder times
    public void addReminderTime(ReminderTime reminderTime) {
        reminderTimes.add(reminderTime);
        reminderTime.setReminder(this);
    }
    
    // Helper method to clear reminder times
    public void clearReminderTimes() {
        this.reminderTimes.clear();
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    // Enum
    public enum SetOptions {
        EVERYDAY,
        WEEKDAYS,
        WEEKENDS,
        CUSTOM
    }
}