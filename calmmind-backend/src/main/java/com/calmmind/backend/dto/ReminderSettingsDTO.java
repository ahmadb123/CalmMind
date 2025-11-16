package com.calmmind.backend.dto;
import java.util.List;


import com.calmmind.backend.model.RemindersAndNotes.*;

public class ReminderSettingsDTO {
    private SetOptions setOptions;
    private List<String> reminderTimes;
    
    public ReminderSettingsDTO() {}
    
    // Getters and Setters
    public SetOptions getSetOptions() {
        return setOptions;
    }
    
    public void setSetOptions(SetOptions setOptions) {
        this.setOptions = setOptions;
    }
    
    public List<String> getReminderTimes() {
        return reminderTimes;
    }
    
    public void setReminderTimes(List<String> reminderTimes) {
        this.reminderTimes = reminderTimes;
    }
}