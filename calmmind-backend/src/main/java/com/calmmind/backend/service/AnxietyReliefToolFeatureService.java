package com.calmmind.backend.service;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeature;
import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefAttachmentType;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeatures;
import com.calmmind.backend.repository.AnxietyReliefFeatureRepo.AnxietyReliefFeatureRepository;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.model.User;
import com.calmmind.backend.AnxietyFeature.ToolUsageLog;
import com.calmmind.backend.repository.AnxietyReliefFeatureRepo.ToolUsageLogRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public class AnxietyReliefToolFeatureService implements IAnxietyReliefToolFeatureService {
    private final AnxietyReliefFeatureRepository anxietyReliefFeatureRepository;
    private final UserRepository userRepo;
    public AnxietyReliefToolFeatureService(AnxietyReliefFeatureRepository anxietyReliefFeatureRepository, UserRepository userRepo) {
        this.userRepo = userRepo;
        this.anxietyReliefFeatureRepository = anxietyReliefFeatureRepository;
    }

    @Override 
    public List<AnxietyReliefFeature> getToolsForUser(Long userId){
        // get all tools, general and style specific
        List<AnxietyReliefFeature> tools = new ArrayList<>();
        // get general tools
        tools.addAll(anxietyReliefFeatureRepository.findByCategory(AnxietyReliefAttachmentType.GENERAL));
        // check if user has attachment style:
        if(userId != null){
            // find user 
            Optional<User> userOpt = userRepo.findById(userId);
            if(userOpt.isPresent()){
                User user = userOpt.get();
                AttachmentStyle userStyle = user.getAttachmentStyle();
                if (userStyle != null && userStyle != AttachmentStyle.GENERAL) {
                    AnxietyReliefAttachmentType category = mapStyleToCategory(userStyle);
                    tools.addAll(anxietyReliefFeatureRepository.findByCategory(category));
                }
            }
        }
        return tools;
    }
    // Helper method to map AttachmentStyle -> AnxietyReliefAttachmentType
    private AnxietyReliefAttachmentType mapStyleToCategory(AttachmentStyle style){
        switch(style){
            case ANXIOUS:
                return AnxietyReliefAttachmentType.ANXIOUS_SPECIFIC;
            case AVOIDANT:
                return AnxietyReliefAttachmentType.AVOIDANT_SPECIFIC;
            case FEARFUL_AVOIDANT:
                return AnxietyReliefAttachmentType.FEARFUL_SPECIFIC;
            case SECURE:
                return AnxietyReliefAttachmentType.SECURE_SPECIFIC;
            default:
                return AnxietyReliefAttachmentType.GENERAL;
        }
    }

    // return all tools by feature type
    @Override 
    public List<AnxietyReliefFeature> getToolsByFeatureType(AnxietyReliefFeatures featureType){
        return anxietyReliefFeatureRepository.findByFeatureType(featureType);
    }

    @Override 
    public AnxietyReliefFeature getToolById(Long toolId){
        Optional<AnxietyReliefFeature> toolOpt = anxietyReliefFeatureRepository.findById(toolId);
        if(toolOpt.isPresent()){
            return toolOpt.get();
        }
        return null;
    }

    @Override 
    public List<AnxietyReliefAttachmentType> getAllAttachmentCategories(){
        AnxietyReliefAttachmentType[] allCategroies = AnxietyReliefAttachmentType.values();
        List<AnxietyReliefAttachmentType> categoryList = new ArrayList<>();
        for(AnxietyReliefAttachmentType category : allCategroies){
            categoryList.add(category);
        }
        return categoryList;
    }

    @Override 
    public List<AnxietyReliefFeatures> getAllFeatureTypes(){
        AnxietyReliefFeatures[] allFeatures = AnxietyReliefFeatures.values();
        List<AnxietyReliefFeatures> featureList = new ArrayList<>();
        for(AnxietyReliefFeatures feature : allFeatures){
            featureList.add(feature);
        }
        return featureList;
    }
}