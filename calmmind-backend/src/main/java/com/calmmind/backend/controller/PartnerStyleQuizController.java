package com.calmmind.backend.controller;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.service.PartnerStyleTestService.IPartnerStyleTestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.model.User;
import com.calmmind.backend.dto.PartnerStyleQuizResponseDTO;
import com.calmmind.backend.repository.UserRepository;

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
    @GetMapping("responses/{userId}")
    public ResponseEntity<?> getResponses(@PathVariable Long userId){
        try{
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
            List<PartnerStyleQuizResponseDTO> responses = partnerStyleTestService.getResponse(user);
            return ResponseEntity.ok(responses);
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving quiz responses: " + e.getMessage());
        }
    }
}