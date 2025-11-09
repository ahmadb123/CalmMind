package com.calmmind.backend.service;
import com.calmmind.backend.quiz.QuizResult;
import com.calmmind.backend.model.QuizQuestion;
import java.util.List;
import java.util.Map;

public interface IQuizService{
    // methods to be defind 
    /**
     * Get all 12 quiz questions
     * Called when: User clicks "Take Quiz"
     */
    List<QuizQuestion> getQuizQuestions();
    /* Submit entire quiz with all answers
        * Called when: User clicks "Submit" after answering all questions
        * 
        * @param userId - User taking the quiz
        * @param answers - Map of questionId → answer (1-7)
        *                  Example: {1: 5, 2: 6, ..., 12: 4}
        * @return QuizResult with calculated scores and attachment style
    */   
    QuizResult submitQuiz(Long userId, Map<Integer,Integer> answers);
    /**
     * Get user's quiz result
     * Called when: User views results or homepage needs attachment style
     * 
     * @param userId - User ID
     * @return QuizResult or throws exception if not found
    */
    QuizResult getQuizResult(Long userId);
    // did user take quiz?
    boolean hasUserTakenQuiz(Long userId);
    // delete if user wants to retake 
    void retakeQuiz(Long userId);
}