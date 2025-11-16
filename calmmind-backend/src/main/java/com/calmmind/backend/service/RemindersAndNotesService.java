package com.calmmind.backend.service;

import com.calmmind.backend.dto.ReminderSettingsDTO;
import com.calmmind.backend.model.RemindersAndNotes;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.repository.RemindersAndNotesRepository;
import com.calmmind.backend.model.User;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.calmmind.backend.model.ReminderTime;

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
    @Transactional
    public RemindersAndNotes setReminderTimeAndDate(Long id, ReminderSettingsDTO settings) {
        RemindersAndNotes reminderOrNote = getReminderOrNote(id);
        // update fields based on settings
        reminderOrNote.setSetOptions(settings.getSetOptions());
        reminderOrNote.setIsActive(true);

        reminderOrNote.clearReminderTimes();
        // add new reminder times
        if(settings.getReminderTimes() != null && !settings.getReminderTimes().isEmpty()){
            for(String timeString : settings.getReminderTimes()){
                try{
                    LocalTime dateTime = LocalTime.parse(timeString);
                    ReminderTime time = new ReminderTime(reminderOrNote , dateTime);
                    reminderOrNote.addReminderTime(time);
                }catch(Exception e){
                    throw new IllegalArgumentException("Invalid date time format: " + timeString);
                }
            }
        }else{
            throw new IllegalArgumentException("Reminder times cannot be null or empty");
        }
        return remindersAndNotesRepository.save(reminderOrNote);
    }
    @Override
    public void deleteReminderOrNoteById(Long id){
        RemindersAndNotes reminderOrNote = getReminderOrNote(id);
        remindersAndNotesRepository.delete(reminderOrNote);
    }
}