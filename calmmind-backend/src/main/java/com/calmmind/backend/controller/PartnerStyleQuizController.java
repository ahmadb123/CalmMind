package com.calmmind.backend.controller;


import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizResultsDTO;
import com.calmmind.backend.dto.PartnerStyleQuizSubmissionDTO;
import com.calmmind.backend.service.PartnerStyleTestService.IPartnerStyleTestService;
import com.calmmind.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partner-style-quiz")
@CrossOrigin(origins = "*")

public class PartnerStyleQuizController {
    private final IPartnerStyleTestService partnerStyleTestService;
    private final UserRepository userRepository;

    public PartnerStyleQuizController(IPartnerStyleTestService partnerStyleTestService,
                                       UserRepository userRepository) {
        this.partnerStyleTestService = partnerStyleTestService;
        this.userRepository = userRepository;
    }

    @GetMapping("/quiz")
    public ResponseEntity<?> getQuestionByGroup(){
        try{
            List<PartnerStyleQuizQuestionDTO> questions = partnerStyleTestService.getQuiz();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving quiz questions");
        }
    }

    // SUBMIT QUIZ ANSWERS 
    @PostMapping("/submit/{userId}")
    public ResponseEntity<?> submitQuiz(@PathVariable Long userId, @RequestBody List<PartnerStyleQuizSubmissionDTO> responses){
        try{
            partnerStyleTestService.submitQuiz(userId, responses);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error submitting quiz responses");
        }
    }
    

    // GET RESULTS 
    @GetMapping("/results/{userId}")
    public ResponseEntity<?> getResults(@PathVariable Long userId){
        try{
            PartnerStyleQuizResultsDTO results = partnerStyleTestService.getResults(userId);
            if(results == null){
                return ResponseEntity.ok().body(null);
            }
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving quiz results");
        }
    }
}