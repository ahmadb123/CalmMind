package com.calmmind.backend.config;

import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.model.Affirmation;
import com.calmmind.backend.repository.AffirmationRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import java.util.List;

@Component // helps initialize the DB with default values
public class AffirmationsDataInitalizer {
    private final AffirmationRepository affRepo; 
    
    public AffirmationsDataInitalizer(AffirmationRepository affRepo) {
        this.affRepo = affRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializeAffirmationsData(){
        // only if the table is empty init: to avoid duplications 
        if(affRepo.count() > 0){
            System.out.println("Affirmations already seeded. Skipping...");
            return;
        }

        System.out.println("Seeding affirmation data...");

        affRepo.saveAll(List.of(

            // =====================
            // ANXIOUS
            // =====================
            aff("Their silence isn't rejection—it's their way of processing. Give them space.", AttachmentStyle.ANXIOUS, "DAILY"),
            aff("You don't need constant reassurance to know you're worthy of love.", AttachmentStyle.ANXIOUS, "DAILY"),
            aff("Breathe. Not every gap in conversation means they're pulling away.", AttachmentStyle.ANXIOUS, "CALM"),
            aff("Your worth isn't determined by how quickly they respond to your texts.", AttachmentStyle.ANXIOUS, "DAILY"),
            aff("It's okay to feel anxious. Acknowledge it, then let it pass like a wave.", AttachmentStyle.ANXIOUS, "CALM"),
            aff("Needing reassurance is human, but you are already enough as you are.", AttachmentStyle.ANXIOUS, "DAILY"),
            aff("Their need for alone time isn't about you—it's about them recharging.", AttachmentStyle.ANXIOUS, "RELATIONSHIP"),
            aff("You can trust someone and still feel scared. Both feelings can coexist.", AttachmentStyle.ANXIOUS, "DAILY"),
            aff("Chasing won't make them stay. Trust that if it's right, they'll choose you.", AttachmentStyle.ANXIOUS, "RELATIONSHIP"),
            aff("One moment of distance doesn't erase all the moments of closeness you've shared.", AttachmentStyle.ANXIOUS, "RELATIONSHIP"),

            // =====================
            // AVOIDANT
            // =====================
            aff("It's okay to let people in gradually. Vulnerability is strength, not weakness.", AttachmentStyle.AVOIDANT, "DAILY"),
            aff("Needing space doesn't mean you don't care—it's how you process and recharge.", AttachmentStyle.AVOIDANT, "DAILY"),
            aff("You can maintain your independence while being emotionally close to someone.", AttachmentStyle.AVOIDANT, "RELATIONSHIP"),
            aff("Sharing your feelings won't trap you. It will actually set you free.", AttachmentStyle.AVOIDANT, "DAILY"),
            aff("It's safe to depend on someone. Interdependence isn't the same as losing yourself.", AttachmentStyle.AVOIDANT, "RELATIONSHIP"),
            aff("Your need for autonomy is valid, and so is your partner's need for connection.", AttachmentStyle.AVOIDANT, "RELATIONSHIP"),
            aff("Running away won't protect you from hurt. Staying might bring you joy.", AttachmentStyle.AVOIDANT, "DAILY"),
            aff("You deserve to be seen and known, not just admired from a distance.", AttachmentStyle.AVOIDANT, "RELATIONSHIP"),
            aff("Asking for space is healthy. Disappearing without explanation creates wounds.", AttachmentStyle.AVOIDANT, "RELATIONSHIP"),
            aff("Love doesn't mean losing yourself. It means finding yourself with someone else.", AttachmentStyle.AVOIDANT, "DAILY"),

            // =====================
            // SECURE
            // =====================
            aff("Trust your instincts—your healthy relationship patterns serve you well.", AttachmentStyle.SECURE, "DAILY"),
            aff("You communicate your needs clearly, and that's a powerful gift.", AttachmentStyle.SECURE, "DAILY"),
            aff("Conflict doesn't threaten your relationship. It's an opportunity to grow closer.", AttachmentStyle.SECURE, "RELATIONSHIP"),
            aff("You can be independent and connected at the same time. You've mastered the balance.", AttachmentStyle.SECURE, "DAILY"),
            aff("Your ability to self-soothe is a strength. Share it with your partner.", AttachmentStyle.SECURE, "DAILY"),
            aff("Healthy relationships have both closeness and space. You navigate this beautifully.", AttachmentStyle.SECURE, "RELATIONSHIP"),
            aff("You trust without needing control, and love without losing yourself.", AttachmentStyle.SECURE, "RELATIONSHIP"),
            aff("Your consistency and reliability are pillars of a strong relationship.", AttachmentStyle.SECURE, "RELATIONSHIP"),
            aff("You repair after conflict, and that's what truly matters.", AttachmentStyle.SECURE, "RELATIONSHIP"),
            aff("You give love freely because you know you are already whole.", AttachmentStyle.SECURE, "DAILY"),

            // =====================
            // FEARFUL_AVOIDANT
            // =====================
            aff("You deserve love without constant fear of loss. Safety is possible.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("It's okay to want both closeness and space. You're not broken—you're human.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("Taking emotional risks is how we grow. You're brave for trying.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("Your push-pull pattern is a protection, not a flaw. You can learn new ways.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("You can be scared and still move toward connection. Both feelings can exist.", AttachmentStyle.FEARFUL_AVOIDANT, "RELATIONSHIP"),
            aff("Not everyone will hurt you the way you've been hurt before.", AttachmentStyle.FEARFUL_AVOIDANT, "RELATIONSHIP"),
            aff("It's safe to trust again, slowly. Healing doesn't have to be rushed.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("Your fear of intimacy and fear of abandonment can both soften over time.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("You're allowed to change your mind about what you need. That's growth, not failure.", AttachmentStyle.FEARFUL_AVOIDANT, "DAILY"),
            aff("Vulnerability feels terrifying, but it's the bridge to the love you crave.", AttachmentStyle.FEARFUL_AVOIDANT, "RELATIONSHIP"),

            // =====================
            // GENERAL
            // =====================
            aff("You are worthy of love and belonging, exactly as you are.", AttachmentStyle.GENERAL, "DAILY"),
            aff("Breathe. You are exactly where you need to be right now.", AttachmentStyle.GENERAL, "CALM"),
            aff("Every relationship teaches you something valuable about yourself.", AttachmentStyle.GENERAL, "RELATIONSHIP"),
            aff("Your feelings are valid, even the complicated, contradictory ones.", AttachmentStyle.GENERAL, "DAILY"),
            aff("Healthy love feels calm, not chaotic. You deserve peace.", AttachmentStyle.GENERAL, "RELATIONSHIP"),
            aff("It's okay to still be learning how to love and be loved.", AttachmentStyle.GENERAL, "DAILY"),
            aff("Your past doesn't define your capacity for future happiness.", AttachmentStyle.GENERAL, "DAILY"),
            aff("You're allowed to set boundaries and still be a loving person.", AttachmentStyle.GENERAL, "RELATIONSHIP"),
            aff("Self-compassion is the foundation of all healthy relationships.", AttachmentStyle.GENERAL, "DAILY"),
            aff("You don't have to be perfect to be loved. You just have to be you.", AttachmentStyle.GENERAL, "DAILY")
        ));
        System.out.println("Affirmations seeded successfully.");
    }


    // save method helper: 
    private Affirmation aff(String message, AttachmentStyle style, String category){
        return new Affirmation(message, style, category);
    }
}