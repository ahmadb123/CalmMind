package com.calmmind.backend.controller;

import com.calmmind.backend.service.IQuizService;
import com.calmmind.backend.model.QuizQuestion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController 
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")

public class QuizController {
    private final IQuizService quizService;
    public QuizController(IQuizService quizService){
        this.quizService = quizService;
    }

    /** GET QUIZ */
    @GetMapping("/takeQuiz")
    public ResponseEntity<?> getQuizQuestions(){
        try{
            List<QuizQuestion> questions = quizService.getQuizQuestions();
            if(questions.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No quiz questions found");
            }
            return ResponseEntity.ok(questions);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving quiz questions: " + e.getMessage());
        }
    }
}