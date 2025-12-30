package com.calmmind.backend.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizQuestionRepository;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuestionGroupRepository;
import java.util.List;

@Component
public class PartnerStyleQuizQuestionDataInitalizer {

    private final PartnerStyleQuizQuestionRepository partnerQuizRepo;
    private final PartnerStyleQuestionGroupRepository groupRepo;

    public PartnerStyleQuizQuestionDataInitalizer(
            PartnerStyleQuizQuestionRepository partnerQuizRepo,
            PartnerStyleQuestionGroupRepository groupRepo
    ) {
        this.partnerQuizRepo = partnerQuizRepo;
        this.groupRepo = groupRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initializePartnerStyleQuizQuestions() {

        if (partnerQuizRepo.count() > 0) {
            System.out.println("Partner style quiz questions already exist. Skipping initialization.");
            return;
        }

        PartnerStyleQuestionGroup avoidant =
                groupRepo.findByGroupName(PartnerStyleQuestionGroup.Groups.AVOIDANT)
                        .orElseThrow(() -> new RuntimeException("Avoidant group not found"));

        PartnerStyleQuestionGroup secure =
                groupRepo.findByGroupName(PartnerStyleQuestionGroup.Groups.SECURE)
                        .orElseThrow(() -> new RuntimeException("Secure group not found"));

        PartnerStyleQuestionGroup anxious =
                groupRepo.findByGroupName(PartnerStyleQuestionGroup.Groups.ANXIOUS)
                        .orElseThrow(() -> new RuntimeException("Anxious group not found"));

        partnerQuizRepo.saveAll(List.of(

            /* ================= AVOIDANT ================= */
            q("Sends mixed signals.", avoidant, 1, List.of(
                "Seems distant and aloof yet vulnerable at the same time.",
                "Sometimes calls a lot and other times not at all.",
                "Says something intimate but later acts as though there is no future."
            )),

            q("Values independence greatly.", avoidant, 2, List.of(
                "Needs a lot of space.",
                "Work leaves no room for a serious relationship.",
                "Rejects emotional dependency or neediness."
            )),

            q("Devalues partners.", avoidant, 3, List.of(
                "Jokes about your flaws, even if playfully.",
                "Fixates on physical flaws in past partners.",
                "Cheated on a past partner."
            )),

            q("Uses distancing strategies.", avoidant, 4, List.of(
                "Maintains emotional or physical distance.",
                "Avoids shared living or sleeping arrangements.",
                "Prefers taking vacations alone.",
                "Leaves future plans unclear.",
                "Physically distances themselves when together."
            )),

            q("Emphasizes boundaries.", avoidant, 5, List.of(
                "Keeps friends or family separate from the relationship.",
                "Avoids inviting you into their personal space."
            )),

            q("Has unrealistically romantic views.", avoidant, 6, List.of(
                "Longs for a perfect future partner.",
                "Idealizes past relationships without clarity."
            )),

            q("Mistrustful of partners.", avoidant, 7, List.of(
                "Fears being financially or emotionally exploited.",
                "Suspects partners have hidden motives."
            )),

            q("Rigid relationship rules.", avoidant, 8, List.of(
                "Has rigid rules about relationships.",
                "Strongly prefers a specific partner type.",
                "Believes marriage or shared living is a bad idea.",
                "Makes sweeping negative statements about partners.",
                "Avoids phone communication even when important."
            )),

            q("Withdraws or explodes during conflict.", avoidant, 9, List.of(
                "Withdraws during disagreements.",
                "Explodes emotionally and walks away."
            )),

            q("Does not clarify intentions.", avoidant, 10, List.of(
                "Avoids saying “I love you” despite long-term involvement.",
                "Makes long-term plans without including you."
            )),

            q("Avoids relationship discussions.", avoidant, 11, List.of(
                "Avoids conversations about the relationship.",
                "Responds vaguely without clarification.",
                "Certain relationship topics are off-limits."
            )),

            /* ================= SECURE ================= */
            q("Reliable and consistent.", secure, 1, List.of(
                "Calls when they say they will.",
                "Follows through on plans.",
                "Explains or apologizes when plans change."
            )),

            q("Makes decisions together.", secure, 2, List.of(
                "Discusses plans openly.",
                "Considers your preferences."
            )),

            q("Flexible relationship views.", secure, 3, List.of(
                "Open to different relationship arrangements.",
                "Does not look for a rigid partner type.",
                "Avoids sweeping negative relationship statements."
            )),

            q("Communicates well.", secure, 4, List.of(
                "Encourages open relationship conversations.",
                "Addresses concerns directly instead of acting out."
            )),

            q("Resolves conflicts constructively.", secure, 5, List.of(
                "Tries to understand your perspective.",
                "Focuses on solving problems rather than winning."
            )),

            q("Comfortable with commitment.", secure, 6, List.of(
                "Comfortable with emotional closeness.",
                "Does not fear dependency or commitment."
            )),

            q("Views relationships as balanced.", secure, 7, List.of(
                "Does not emphasize struggle or sacrifice.",
                "Open to relationships even when life is imperfect."
            )),

            q("Closeness builds closeness.", secure, 8, List.of(
                "Reassures after emotional conversations.",
                "Expresses closeness after intimacy."
            )),

            q("Includes you socially.", secure, 9, List.of(
                "Introduces you to friends and family.",
                "Includes you in their social world."
            )),

            q("Expresses love openly.", secure, 10, List.of(
                "Expresses feelings early.",
                "Uses “I love you” naturally."
            )),

            q("Does not play games.", secure, 11, List.of(
                "Avoids manipulation or jealousy tactics.",
                "Does not keep score in communication."
            )),

            /* ================= ANXIOUS ================= */
            q("Seeks high closeness.", anxious, 1, List.of(
                "Seeks frequent closeness early in relationships.",
                "Enjoys a high level of physical affection."
            )),

            q("Expresses insecurities.", anxious, 2, List.of(
                "Worries about rejection.",
                "Compares themselves to past partners.",
                "Tries hard to please their partner."
            )),

            q("Unhappy when single.", anxious, 3, List.of(
                "Feels unhappy or incomplete when single.",
                "Approaches dating with desperation."
            )),

            q("Plays attention-seeking games.", anxious, 4, List.of(
                "Acts distant to provoke reassurance.",
                "Pretends to be unavailable.",
                "Manipulates situations to gain attention."
            )),

            q("Expects mind-reading.", anxious, 5, List.of(
                "Uses subtle emotional cues.",
                "Expects partner to guess what is wrong."
            )),

            q("Acts out emotionally.", anxious, 6, List.of(
                "Threatens to leave during conflicts.",
                "Stores resentment instead of communicating."
            )),

            q("Personalizes behavior.", anxious, 7, List.of(
                "Interprets neutral behavior as rejection.",
                "Personalizes situations excessively."
            )),

            q("Avoids emotional risk.", anxious, 8, List.of(
                "Mirrors partner’s emotional investment.",
                "Avoids emotional risk to prevent hurt."
            )),

            q("Preoccupied with relationship.", anxious, 9, List.of(
                "Obsessively analyzes relationship details.",
                "Communicates excessively or withdraws completely."
            )),

            q("Overanalyzes interactions.", anxious, 10, List.of(
                "Overthinks small actions or comments.",
                "Fears partner will lose interest."
            )),

            q("Fears infidelity.", anxious, 11, List.of(
                "Checks messages or passwords.",
                "Monitors partner’s whereabouts.",
                "Searches belongings for signs of infidelity."
            ))
        ));

        System.out.println("Partner style quiz questions initialized successfully.");
    }

    /* ================= HELPER ================= */

    private PartnerStyleQuizQuestion q(
            String question,
            PartnerStyleQuestionGroup group,
            int questionNum,
            List<String> descriptions
    ) {
        return new PartnerStyleQuizQuestion(question, group, descriptions, questionNum);
    }
}
