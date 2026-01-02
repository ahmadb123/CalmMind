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
        
        group(PartnerStyleQuestionGroup.Groups.AVOIDANT, """
            It seems that your partner/date has an avoidant attachment style.
            This means that you can’t take closeness and intimacy for granted.
            Someone who is secure or anxious has a basic wish to be close;
            with someone avoidant, that basic desire is missing.
            While they do have a need for attachment and love,
            they possess a basic mechanism in the brain that limits attachment—they tend to feel suffocated when things get too close.
            With avoidants, everyday interactions and conversations—whether they are about which channel to watch on TV or how to raise the kids—
            are actually negotiations for space and independence.
            You often wind up complying with their wishes, because otherwise they will withdraw.
            Research shows that avoidants hardly ever date one another; they simply lack the glue that keeps things together.
            """
        ),
        group(PartnerStyleQuestionGroup.Groups.SECURE, """
            Your partner/date has a secure attachment style.
            Such people want to be close; at the same time, they are not overly sensitive to rejection.
            They are also great communicators and know how to get their message across in a way that is straightforward yet not accusing.
            Once you get close to someone with this attachment style, you don’t have to negotiate intimacy anymore—it becomes a given.
            This frees both of you to enjoy life and grow.
            They listen to your point of view and try to make things work in a way that will be acceptable to you both.
            They have an innate understanding of what a romantic partnership means—namely, that your partner’s well-being is your own, and vice versa.
            These qualities allow you to be your most authentic self, which research has shown to be one of the most important factors contributing to your overall happiness and well-being.
            """
        ),
        group(PartnerStyleQuestionGroup.Groups.ANXIOUS, """
            Your partner/date has an anxious attachment style.
            Someone with an anxious attachment style craves intimacy but is also very sensitive to even the smallest perceived threats to this closeness.
            Sometimes they’ll interpret your unconscious actions as a threat to the relationship.
            When this happens, they become flooded with apprehension, but they lack the skills to communicate their distress to you effectively.
            Instead, they may resort to a lot of acting out and drama.
            This can create a vicious cycle, as they become even more sensitive to slights and their distress is compounded.
            This may sound daunting, but before you call it quits, it’s important to know that if you’re sensitive and nurturing enough to calm their fears—which is very doable—you will gain a greatly loving and devoted partner.
            Once you are receptive to their basic needs for warmth and security, their sensitivity can become an asset.
            They’ll be very much in tune with your wants and will be helpful and dedicated.
            What’s more, they will also gradually learn how to communicate their fears and emotions better, and you will need to second-guess them less and less.
            """
        )
       ));
       System.out.println("Initializing partner style question groups...");

    }

    /*SAVE METHOD HELPER */
    private PartnerStyleQuestionGroup group(PartnerStyleQuestionGroup.Groups groupName, String scoringKeyDesc){
        return new PartnerStyleQuestionGroup(groupName, scoringKeyDesc);
    }
}