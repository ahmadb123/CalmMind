package com.calmmind.backend.controller;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.service.PartnerStyleTestService.IPartnerStyleTestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/partner-style-quiz")
@CrossOrigin(origins = "*")

public class PartnerStyleQuizController {
    private final IPartnerStyleTestService partnerStyleTestService;

    public PartnerStyleQuizController(IPartnerStyleTestService partnerStyleTestService) {
        this.partnerStyleTestService = partnerStyleTestService;
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
}