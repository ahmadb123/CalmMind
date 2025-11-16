package com.calmmind.backend.repository;

import com.calmmind.backend.model.ReminderTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderTimeRepository extends JpaRepository<ReminderTime, Long> {
    // Define custom query methods if needed
}