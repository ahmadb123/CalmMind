package com.calmmind.backend.config;

import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuestionGroupRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class PartnerStyleQuestionGroupsDataInitalizer{
    private final PartnerStyleQuestionGroupRepository groupRepo;

    public PartnerStyleQuestionGroupsDataInitalizer(PartnerStyleQuestionGroupRepository groupRepo) {
        this.groupRepo = groupRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializePartnerStyleQuestionGroups() {
        // Only initialize if table is empty
       if(groupRepo.count() > 0){
           System.out.println("Partner style question groups already exist. Skipping initialization.");
           return;
       }

       groupRepo.saveAll(List.of(
        group(PartnerStyleQuestionGroup.Groups.AVOIDANT, 11, 33),
        group(PartnerStyleQuestionGroup.Groups.SECURE, 11, 33),
        group(PartnerStyleQuestionGroup.Groups.ANXIOUS, 11, 33)
       ));
       System.out.println("Initializing partner style question groups...");

    }

    /*SAVE METHOD HELPER */
    private PartnerStyleQuestionGroup group(PartnerStyleQuestionGroup.Groups groupName, Integer minScore, Integer maxScore){
        return new PartnerStyleQuestionGroup(groupName, minScore, maxScore);
    }
}