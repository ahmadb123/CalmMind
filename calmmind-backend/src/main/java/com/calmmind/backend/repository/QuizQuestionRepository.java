package com.calmmind.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.model.QuizDimension;
import com.calmmind.backend.model.QuizQuestion;

/*
 * retrieve The 12 quiz questions from database
 */
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    /*
     * Retrieve all quiz questions from the database.
     */
    List<QuizQuestion> findByDimension(QuizDimension dimension);
    List<QuizQuestion> findAllByOrderByQuestionNumberAsc();
}