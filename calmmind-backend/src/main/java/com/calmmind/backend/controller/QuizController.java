package com.calmmind.backend.controller;

import com.calmmind.backend.dto.UserStyleQuizDTO;
import com.calmmind.backend.dto.UserStyleQuizResultsDTO;
import com.calmmind.backend.dto.UserStyleQuizSubmissionDTO;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import com.calmmind.backend.service.UserStyleQuizService.IUserStyleQuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController 
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")

public class QuizController {
    private final IUserStyleQuizService quizService;
    public QuizController(IUserStyleQuizService quizService){
        this.quizService = quizService;
    }

    /** GET QUIZ */
    @GetMapping("/takeQuiz")
    public ResponseEntity<?> getQuizQuestions(){
        try{
            List<UserStyleQuizDTO> questions = quizService.getQuiz();
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
    public ResponseEntity<?> submitQuiz(@PathVariable Long userId, @RequestBody List<UserStyleQuizSubmissionDTO> answers){
        try{
            if(userId == null || answers == null || answers.isEmpty()){
                return ResponseEntity.badRequest().body("Invalid user ID or answers");
            }
            quizService.submitQuiz(userId, answers);
            return ResponseEntity.ok(answers);
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
            UserStyleQuizResultsDTO result = quizService.getResults(userId);
            if(result == null){
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(result);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving quiz result: " + e.getMessage());
        }
    }
}