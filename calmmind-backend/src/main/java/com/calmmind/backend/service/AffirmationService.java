package com.calmmind.backend.service;
import org.springframework.stereotype.Service;
import java.util.Random;
import java.util.List;
import com.calmmind.backend.model.Affirmation;
import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.repository.AffirmationRepository;

@Service
public class AffirmationService implements IAffirmationService{ 
    private final AffirmationRepository affirmationRepository;
    private final Random random = new Random();

    public AffirmationService(AffirmationRepository affirmationRepository) {
        this.affirmationRepository = affirmationRepository;
    }

    @Override 
    public Affirmation getRandomAffirmation(){
        // get any random affirmation from the repository pick random one and return
        List<Affirmation> allAffirmations = affirmationRepository.findAll();
        if(allAffirmations.isEmpty()){
            return createDefaultAffirmation();
        }
        int randomIndex = random.nextInt(allAffirmations.size());
        return allAffirmations.get(randomIndex);
    }

    @Override 
    public Affirmation getRandomAffirmationPerStyle(AttachmentStyle style){
        if(style == null){
            return getRandomAffirmation(); // no style, set back to default function
        }
        List<Affirmation> styleAffirmations = affirmationRepository.findByAttachmentStyle(style);
        if(styleAffirmations.isEmpty()){
            return createDefaultAffirmation();
        }
        int randomIndex = random.nextInt(styleAffirmations.size());
        return styleAffirmations.get(randomIndex);
    }

    @Override 
    public Affirmation createDefaultAffirmation(){
        return 
            new Affirmation("You are worthy of love and belonging.",
            AttachmentStyle.GENERAL,
            "DAILY");
    }
}
