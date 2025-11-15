package com.calmmind.backend.service;
import com.calmmind.backend.model.RemindersAndNotes;
import com.calmmind.backend.model.RemindersAndNotes.SetOptions;;
import com.calmmind.backend.model.RemindersAndNotes.WhenOptions;
import com.calmmind.backend.model.RemindersAndNotes.FrequentAndTimingOptions;
import com.calmmind.backend.model.RemindersAndNotes.Timing;
import java.util.List;

public interface IRemindersAndNotesService {
    // create reminder or not 
    RemindersAndNotes createReminderOrNote(RemindersAndNotes reminderOrNote);
    // get all reminders and notes by userId
    List<RemindersAndNotes> getRemindersAndNotesByUserId(Long userId);
    // get specific reminder or not by note/reminder it:
    RemindersAndNotes getReminderOrNote(Long id);
    // set reminder time and date
    RemindersAndNotes setReminderTimeAndDate(Long id, SetOptions setOptions, WhenOptions whenOptions, FrequentAndTimingOptions frequentAndTimingOptions, Timing timing);
    // delete reminder or note by id
    void deleteReminderOrNoteById(Long id);
}