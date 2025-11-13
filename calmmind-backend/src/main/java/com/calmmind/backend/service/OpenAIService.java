package com.calmmind.backend.service;

import com.calmmind.backend.dto.RequestChatGPtDTO;
import com.calmmind.backend.dto.ResponseChatGPtDTO;
import com.google.gson.Gson;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service 
public class OpenAIService{
    private static final String MODEL = "gpt-5-mini";
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    @Value("${openai.api.key}")
    private String openAiApiKey;
    private final OkHttpClient client = new OkHttpClient();
    private final Gson gson = new Gson();
    public RequestChatGPtDTO createRequestDTO(String userMessage){
        List<RequestChatGPtDTO.Message> messages = new ArrayList<>(); // Create message list
        messages.add(new RequestChatGPtDTO.Message("user", userMessage)); // Add user
        return new RequestChatGPtDTO(
            MODEL,
            messages
        );
    }

    public ResponseChatGPtDTO getResponse(ResponseChatGPtDTO response){
        return response;
    }

    public ResponseChatGPtDTO callOpenAI(RequestChatGPtDTO requestDTO){
        try{
            String jsonBody = gson.toJson(requestDTO);
            Request request = new Request.Builder()
                .url(OPENAI_API_URL)
                .addHeader("Content-Type", "application/json")
                .addHeader("Authorization", "Bearer " + openAiApiKey)
                .post(RequestBody.create(
                    jsonBody,
                    MediaType.parse("application/json")
                ))
                .build();
                // send request
                Response response = client.newCall(request).execute();
                if(!response.isSuccessful()){
                    throw new IOException("Unexpected code " + response);
                }
                String responseBody = response.body().string();
                return gson.fromJson(responseBody, ResponseChatGPtDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to call OpenAI API: " + e.getMessage(), e);
        }
    }
}
