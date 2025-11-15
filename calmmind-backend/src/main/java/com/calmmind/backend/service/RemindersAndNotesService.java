package com.calmmind.backend.service;

import com.calmmind.backend.model.RemindersAndNotes;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.repository.RemindersAndNotesRepository;
import com.calmmind.backend.model.User;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
@Service
public class RemindersAndNotesService implements IRemindersAndNotesService {
    private final RemindersAndNotesRepository remindersAndNotesRepository;
    private final UserRepository userRepository;
    public RemindersAndNotesService(RemindersAndNotesRepository remindersAndNotesRepository, UserRepository userRepository) {
        this.remindersAndNotesRepository = remindersAndNotesRepository;
        this.userRepository = userRepository;
    }

    @Override 
    public RemindersAndNotes createReminderOrNote(RemindersAndNotes reminderOrNote) {
        if(reminderOrNote == null) {
            throw new IllegalArgumentException("Reminder or Note cannot be null");
        }
        reminderOrNote.setCreatedAt(LocalDateTime.now());
        return remindersAndNotesRepository.save(reminderOrNote);
    }

    @Override 
    public List<RemindersAndNotes> getRemindersAndNotesByUserId(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if(!userOpt.isPresent()) {
            throw new IllegalArgumentException("User not found");
        }
        User user = userOpt.get();
        userId = user.getId();
        List<RemindersAndNotes> remindersAndNotes = remindersAndNotesRepository.findByUserId(userId);
        return remindersAndNotes;
    }

    @Override 
    public RemindersAndNotes getReminderOrNote(Long id){
        Optional<RemindersAndNotes> reminderOrNoteOpt = remindersAndNotesRepository.findById(id);
        if(!reminderOrNoteOpt.isPresent()){
            throw new IllegalArgumentException("Reminder or Note not found");
        }
        RemindersAndNotes reminderOrNote = reminderOrNoteOpt.get();
        return reminderOrNote;
    }
@Override 
    public RemindersAndNotes setReminderTimeAndDate(Long id, 
                                                    RemindersAndNotes.SetOptions setOptions, 
                                                    RemindersAndNotes.WhenOptions whenOptions, 
                                                    RemindersAndNotes.FrequentAndTimingOptions frequentAndTimingOptions, 
                                                    RemindersAndNotes.Timing timing) {
        RemindersAndNotes remindersAndNotes = getReminderOrNote(id);
        
        remindersAndNotes.setSetOptions(setOptions);
        remindersAndNotes.setWhenOptions(whenOptions);
        remindersAndNotes.setFrequentAndTimingOptions(frequentAndTimingOptions);
        remindersAndNotes.setTiming(timing);
        
        return remindersAndNotesRepository.save(remindersAndNotes);
    }
    @Override
    public void deleteReminderOrNoteById(Long id){
        RemindersAndNotes reminderOrNote = getReminderOrNote(id);
        remindersAndNotesRepository.delete(reminderOrNote);
    }
}