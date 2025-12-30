package com.calmmind.backend.service;

import com.calmmind.backend.dto.RequestChatGPtDTO;
import com.calmmind.backend.dto.ResponseChatGPtDTO;
import com.google.gson.Gson;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import java.util.List;
import java.util.concurrent.TimeUnit;
@Service 
public class OpenAIService{
    private static final String MODEL = "gpt-5-mini"; // model name / could use gpt-4-mini
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    private static final String SYSTEM_PROMPT = 
        "You are a compassionate and professional mental health therapist for the CalmMind app. " +
        "Your role is to provide supportive, empathetic guidance to help users manage their emotions and mental health.\n\n" +
        "Each patient takes a quiz to identify their attachment style (Secure, Anxious, Avoidant, Fearful-Avoidant). " +
        "In your responses, consider the user's attachment style and tailor your advice accordingly.\n\n" +
        "Additionally, if user does not provide their attachment style, " +
        "use general best practices in mental health support to guide your responses.\n\n" +
        "IMPORTANT: Always structure your response in exactly three sections:\n\n" +
        
        "1. **Understanding & Validation**\n" +
        "   - Acknowledge the user's feelings with empathy\n" +
        "   - Validate their emotional experience\n" +
        "   - Show that you understand what they're going through\n" +
        "   - Use phrases like \"I hear you,\" \"That sounds really difficult,\" \"It's completely understandable\"\n\n" +
        
        "2. **Reframing & Insight**\n" +
        "   - Help them see their situation from a different perspective\n" +
        "   - Explain what might be happening psychologically\n" +
        "   - Normalize their experience (e.g., \"Many people feel this way when...\")\n" +
        "   - Connect their feelings to common patterns or triggers\n\n" +
        
        "3. **Practical Support & Methods**\n" +
        "   - Provide 3-5 specific, actionable coping strategies\n" +
        "   - Include immediate techniques (breathing, grounding)\n" +
        "   - Suggest longer-term approaches when appropriate\n" +
        "   - Be specific and practical (e.g., \"Try the 4-7-8 breathing technique\")\n\n" +
        
        "Guidelines:\n" +
        "- Keep responses warm, supportive, and non-judgmental\n" +
        "- Use simple, accessible language\n" +
        "- Be concise but thorough (aim for 200-300 words)\n" +
        "- If the user expresses severe distress, self-harm thoughts, or suicidal ideation, " +
        "gently but firmly encourage them to contact a mental health professional or crisis helpline immediately\n" +
        "- Focus on evidence-based mental health practices\n" +
        "- Always maintain professional boundaries";
    @Value("${OPENAI_API_KEY}")
    private String openAiApiKey;
    private final OkHttpClient client = new OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .readTimeout(60, TimeUnit.SECONDS)  
        .build();
    private final Gson gson = new Gson();

    public RequestChatGPtDTO createRequestDTO(String userMessage){
        List<RequestChatGPtDTO.Message> messages = new ArrayList<>(); // Create message list
        messages.add(new RequestChatGPtDTO.Message("system", SYSTEM_PROMPT)); // add system prompt first: 
        messages.add(new RequestChatGPtDTO.Message("user", userMessage)); // user message 
        return new RequestChatGPtDTO(
            MODEL,
            messages
        );
    }

    public ResponseChatGPtDTO getResponse(ResponseChatGPtDTO response){
        return response; // simple return from open AI
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
