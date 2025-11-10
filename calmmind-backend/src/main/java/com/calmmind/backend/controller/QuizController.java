package com.calmmind.backend.controller;

import com.calmmind.backend.service.IQuizService;
import com.calmmind.backend.dto.QuizResultDTO;
import com.calmmind.backend.model.QuizQuestion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


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
    /** POST SUBMT QUIZ  */
    @PostMapping("/submitQuiz/{userId}")
    public ResponseEntity<?> submitQuiz(@PathVariable Long userId, @RequestBody Map<Integer,Integer> answers){
        try{
            if(userId == null || answers == null || answers.isEmpty()){
                return ResponseEntity.badRequest().body("Invalid user ID or answers");
            }
            return ResponseEntity.ok(quizService.submitQuiz(userId, answers));
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error submitting quiz: " + e.getMessage());
        }
    }
    /** GET QUIZ RESULTS */
    @GetMapping("/result/{userId}")
    public ResponseEntity<?> getQuizResults(@PathVariable Long userId){
        try{
            if(userId == null){
                return ResponseEntity.badRequest().body("Invalid user ID");
            }
            QuizResultDTO result = quizService.getQuizResult(userId);
            return ResponseEntity.ok(result);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving quiz results: " + e.getMessage());
        }
    }
}