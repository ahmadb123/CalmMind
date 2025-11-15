package com.calmmind.backend.repository;
import com.calmmind.backend.model.RemindersAndNotes;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RemindersAndNotesRepository extends JpaRepository<RemindersAndNotes, Long> {
    // return list of reminders and notes by userId
    List<RemindersAndNotes> findByUserId(Long userId);

}