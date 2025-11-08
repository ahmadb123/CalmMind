package com.calmmind.backend.controller;
import com.calmmind.backend.model.Affirmation;
import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.service.IAffirmationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/api/affirmations")
@CrossOrigin(origins = "*")

public class AffirmationController {
    private final IAffirmationService affirmationService;
    public AffirmationController(IAffirmationService affirmationService){
        this.affirmationService = affirmationService;
    }

    /**GET RANDOM affiramtion no STYLE */
    @GetMapping("/random")
    public ResponseEntity<?> getRandomAffirmation(){
        try{
            Affirmation affirmation = affirmationService.getRandomAffirmation();
            if(affirmation == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No affirmation found");
            }
            return ResponseEntity.ok(affirmation);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    /**GET RANDOM affirmation PER STYLE */
    @GetMapping("/random/{style}")
    public ResponseEntity<?> getRandomAffirmationPerStyle(@PathVariable String style){
        try{
            AttachmentStyle attachmentStyle = AttachmentStyle.valueOf(style.toUpperCase());
            Affirmation affirmation = affirmationService.getRandomAffirmationPerStyle(attachmentStyle);
            if(affirmation == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No affirmation found for style: " + style);
            }
            return ResponseEntity.ok(affirmation);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body("Invalid attachment style: " + style);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
