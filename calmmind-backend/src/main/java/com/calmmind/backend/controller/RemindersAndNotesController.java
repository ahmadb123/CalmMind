package com.calmmind.backend.controller;

import com.calmmind.backend.dto.ReminderSettingsDTO;
import com.calmmind.backend.model.RemindersAndNotes;
import com.calmmind.backend.service.IRemindersAndNotesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reminders-notes")
@CrossOrigin(origins = "*")
public class RemindersAndNotesController {
    private final IRemindersAndNotesService remindersAndNotesService;

    public RemindersAndNotesController(IRemindersAndNotesService remindersAndNotesService){
        this.remindersAndNotesService = remindersAndNotesService;
    }

    // ** create reminder or a note */
    @PostMapping("/create")
    public ResponseEntity<?> createReminderOrNote(@RequestBody RemindersAndNotes reminderOrNote){
        try{
            RemindersAndNotes created = remindersAndNotesService.createReminderOrNote(reminderOrNote);
            return ResponseEntity.ok(created);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error creating reminder or note: " + e.getMessage()));
        }
    }

    // ** GET reminders and notes for a user */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRemindersAndNotesForUser(@PathVariable Long userId){
        try{
            List<RemindersAndNotes> list = remindersAndNotesService.getRemindersAndNotesByUserId(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error retrieving reminders and notes: " + e.getMessage()));   
        }
    }

    // ** UPDATE reminder settings */
    @PutMapping("/{id}/settings")
    public ResponseEntity<?> updateReminderSettings(@PathVariable Long id, @RequestBody ReminderSettingsDTO settings){
        try{
            RemindersAndNotes updated = remindersAndNotesService.setReminderTimeAndDate(id, settings);
            return ResponseEntity.ok(updated);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error updating reminder settings: " + e.getMessage()));
        }
    }

    // ** DELETE reminder or note */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReminderOrNote(@PathVariable Long id){
        try{
            remindersAndNotesService.deleteReminderOrNoteById(id);
            return ResponseEntity.ok(Map.of("message", "Reminder/Note deleted successfully"));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error deleting reminder or note: " + e.getMessage()));
        }
    }
}