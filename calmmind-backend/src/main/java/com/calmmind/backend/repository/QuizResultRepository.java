package com.calmmind.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.quiz.QuizResult;
import com.calmmind.backend.quiz.Quiz;

/*
 * Repository for managing quiz results.
 */
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    // Repository methods would be defined here
    // get all of a user's quiz results
    List<QuizResult> findByUserId(Long userId);
    // Purpose: Delete all of a user's quiz results (for retake)
    void deleteByUserId(Long userId);
    // Purpose: Check how many quiz results user has
    Long countByUserId(Long userId);
    // Purpose: Quick check if user has ANY quiz results
    boolean existsByUserId(Long userId);

}