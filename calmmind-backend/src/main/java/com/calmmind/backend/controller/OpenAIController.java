package com.calmmind.backend.controller;

import com.calmmind.backend.dto.RequestChatGPtDTO;
import com.calmmind.backend.dto.ResponseChatGPtDTO;
import com.calmmind.backend.service.OpenAIService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/openai")
public class OpenAIController {
    // service methods to interact with OpenAI API
    private final OpenAIService openAIService;
    public OpenAIController(OpenAIService openAIService){
        this.openAIService = openAIService;
    }

    //** OPEN CHAT SEND REQUEST */
    public ResponseEntity<?> requestChatGpt(@RequestBody String userMessage){
        try{
            if(userMessage.isEmpty()){
                throw new IllegalArgumentException("Message cannot be empty");
            }
            RequestChatGPtDTO request = openAIService.createRequestDTO(userMessage);
            // Call OpenAI API and get response
            ResponseChatGPtDTO response = openAIService.callOpenAI(request);
            return ResponseEntity.ok(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error communicating with OpenAI: " + e.getMessage());
        }
    }
}