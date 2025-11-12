package com.calmmind.backend.controller;

import com.calmmind.backend.dto.AnxietyReliefFeatureDTO;
import com.calmmind.backend.service.IAnxietyReliefToolFeatureService;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeature;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefAttachmentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeatures;
import java.util.ArrayList;
import java.util.List;

@RestController 
@RequestMapping("/api/anxiety-tools")
@CrossOrigin(origins = "*")
public class AnxietyToolFeatureController {
    private final IAnxietyReliefToolFeatureService anxietyReliefToolFeatureService;

    public AnxietyToolFeatureController(IAnxietyReliefToolFeatureService anxietyReliefToolFeatureService) {
        this.anxietyReliefToolFeatureService = anxietyReliefToolFeatureService;
    }

    //** GET anxiety relief tools */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getToolsForUser(@PathVariable Long userId){
        try{
            List<AnxietyReliefFeature> tools = anxietyReliefToolFeatureService.getToolsForUser(userId);
            List<AnxietyReliefFeatureDTO> dtoList = new ArrayList<>();
            for(AnxietyReliefFeature tool : tools){
                AnxietyReliefFeatureDTO dto = new AnxietyReliefFeatureDTO(
                    tool.getId(),
                    tool.getFeatureName(),
                    tool.getDescription(),
                    tool.getCategory().toString(),
                    tool.getFeatureType().toString(),
                    tool.getContent(),
                    tool.getAudioUrl(),
                    tool.getDuration()
                );
                dtoList.add(dto);
            }
            // add to dto list
            return ResponseEntity.ok(dtoList);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving anxiety relief tools: " + e.getMessage());
        }
    }

    // GET all tools by feature type: breathing, meditation, etc.
    @GetMapping("/feature-type/{featureType}")
    public ResponseEntity<?> getToolsByFeatureType(@PathVariable AnxietyReliefFeatures featureType){
        try{
            List<AnxietyReliefFeature> tools = anxietyReliefToolFeatureService.getToolsByFeatureType(featureType);
            if(tools.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No tools found for feature type: " + featureType);
            }
            return ResponseEntity.ok(tools);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving tools by feature type: " + e.getMessage());
        }
    }
    
    // ** GET ALL CATEGORIES */
    @GetMapping("/AnxietyReliefAttachmentType")
    public ResponseEntity<?> getAllAttachmentCategories(){
        try{
            List<AnxietyReliefAttachmentType> allCategories = anxietyReliefToolFeatureService.getAllAttachmentCategories();
            return ResponseEntity.ok(allCategories);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving attachment categories: " + e.getMessage());
        }
    }

    // GET tool by ID
    @GetMapping("/tool/{toolId}")
    public ResponseEntity<?> getToolById(@PathVariable Long toolId) {
        try {
            AnxietyReliefFeature tool = anxietyReliefToolFeatureService.getToolById(toolId);
            
            AnxietyReliefFeatureDTO dto = new AnxietyReliefFeatureDTO(
                tool.getId(),
                tool.getFeatureName(),
                tool.getDescription(),
                tool.getCategory().toString(),
                tool.getFeatureType().toString(),
                tool.getContent(),
                tool.getAudioUrl(),
                tool.getDuration()
            );
            
            return ResponseEntity.ok(dto);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Tool not found: " + e.getMessage());
        }
    }

    // ** GET ALL FEATURE TYPES */
    @GetMapping("/AnxietyReliefFeatures")
    public ResponseEntity<?> getAllFeatureTypes(){
        try{
            List<AnxietyReliefFeatures> allFeatureTypes = anxietyReliefToolFeatureService.getAllFeatureTypes();
            return ResponseEntity.ok(allFeatureTypes);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error retrieving feature types: " + e.getMessage()); 
        }
    }
}