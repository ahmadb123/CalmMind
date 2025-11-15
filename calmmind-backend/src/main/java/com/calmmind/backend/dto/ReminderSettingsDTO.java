package com.calmmind.backend.dto;

import com.calmmind.backend.model.RemindersAndNotes.*;

public class ReminderSettingsDTO {
    private SetOptions setOptions;
    private WhenOptions whenOptions;
    private FrequentAndTimingOptions frequentAndTimingOptions;
    private Timing timing;
    
    public ReminderSettingsDTO() {}
    
    // Getters and Setters
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
}