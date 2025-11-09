package com.calmmind.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.quiz.QuizResponse;
import com.calmmind.backend.quiz.Quiz;

/*
 * Retrieves: User's individual answers to questions
 */
public interface QuizResponseRepository extends JpaRepository<QuizResponse, Long> {
    // Repository methods would be defined here
    // get all of a user answers 
    List<QuizResponse> findByUserId(Long userId);

    // Purpose: Delete all of a user's responses (for retake)
    void deleteByUserId(Long userId);
    // Purpose: Check how many questions user has answered
    Long countByUserId(Long userId);
    // Purpose: Quick check if user has ANY responses
    boolean existsByUserId(Long userId);
    // Purpose: Get user's answer to a specific question
    QuizResponse findByUserIdAndQuestionId(Long userId, Long questionId);
}