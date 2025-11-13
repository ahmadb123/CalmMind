package com.calmmind.backend.config;

import com.calmmind.backend.model.QuizQuestion;
import com.calmmind.backend.model.QuizDimension;
import com.calmmind.backend.repository.QuizQuestionRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    
    private final QuizQuestionRepository quizQuestionRepository;
    
    public DataInitializer(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void initializeQuizQuestions() {
        // Only initialize if table is empty
        if (quizQuestionRepository.count() == 0) {
            System.out.println("Initializing quiz questions...");
            
            // Anxiety questions
            quizQuestionRepository.save(new QuizQuestion(
                "I'm afraid that I will lose my partner's love.", 
                QuizDimension.ANXIETY, 
                1
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I often worry that my partner doesn't really love me.", 
                QuizDimension.ANXIETY, 
                2
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I worry a lot about my relationships.", 
                QuizDimension.ANXIETY, 
                3
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I'm afraid that once a romantic partner gets to know me, he or she won't like who I really am.", 
                QuizDimension.ANXIETY, 
                4
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I often worry that my partner will not want to stay with me.", 
                QuizDimension.ANXIETY, 
                5
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "When I show my feelings for romantic partners, I'm afraid they will not feel the same about me.", 
                QuizDimension.ANXIETY, 
                6
            ));
            
            // Avoidance questions
            quizQuestionRepository.save(new QuizQuestion(
                "I prefer not to show a partner how I feel deep down.", 
                QuizDimension.AVOIDANCE, 
                7
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I find it difficult to allow myself to depend on romantic partners.", 
                QuizDimension.AVOIDANCE, 
                8
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I get uncomfortable when a romantic partner wants to be very close.", 
                QuizDimension.AVOIDANCE, 
                9
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I don't feel comfortable opening up to romantic partners.", 
                QuizDimension.AVOIDANCE, 
                10
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I prefer not to be too close to romantic partners.", 
                QuizDimension.AVOIDANCE, 
                11
            ));
            quizQuestionRepository.save(new QuizQuestion(
                "I am nervous when partners get too close to me.", 
                QuizDimension.AVOIDANCE, 
                12
            ));
            
            System.out.println("Quiz questions initialized successfully!");
        } else {
            System.out.println("Quiz questions already exist. Skipping initialization.");
        }
    }
}
