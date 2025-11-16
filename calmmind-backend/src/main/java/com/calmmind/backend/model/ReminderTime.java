package com.calmmind.backend.model;

import jakarta.persistence.*;
import java.time.LocalTime;
import com.calmmind.backend.model.RemindersAndNotes;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "reminder_times")
public class ReminderTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "reminder_id", nullable = false)
    @JsonBackReference
    private RemindersAndNotes reminder;
    
    private LocalTime time;
    
    // Default constructor
    public ReminderTime() {}
    
    public ReminderTime(RemindersAndNotes reminder, LocalTime time) {
        this.reminder = reminder;
        this.time = time;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public RemindersAndNotes getReminder() {
        return reminder;
    }
    
    public void setReminder(RemindersAndNotes reminder) {
        this.reminder = reminder;
    }
    
    public LocalTime getTime() {
        return time;
    }
    
    public void setTime(LocalTime time) {
        this.time = time;
    }
}