package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizSubmissionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizResultsDTO;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizResponse;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizQuestionRepository;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizResponseRepository;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuestionGroupRepository;
import com.calmmind.backend.repository.UserRepository;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
@Service
public class PartnerStyleTestService implements IPartnerStyleTestService {
    private final PartnerStyleQuizQuestionRepository partnerQuizRepo;
    private final PartnerStyleQuizResponseRepository partnerQuizResponseRepo;
    private final PartnerStyleQuestionGroupRepository partnerStyleGroupRepo;
    private final UserRepository userRepository;
    private static final int SCORING_KEY_DOMINANT = 23;
    public PartnerStyleTestService(PartnerStyleQuizQuestionRepository partnerQuizRepo,
                                    PartnerStyleQuizResponseRepository partnerQuizResponseRepo,
                                    PartnerStyleQuestionGroupRepository partnerStyleGroupRepo,
                                    UserRepository userRepository) {
        this.partnerQuizRepo = partnerQuizRepo;
        this.partnerQuizResponseRepo = partnerQuizResponseRepo;
        this.partnerStyleGroupRepo = partnerStyleGroupRepo;
        this.userRepository = userRepository;
    }

    @Override
    public List<PartnerStyleQuizQuestionDTO> getQuiz() {
        List<PartnerStyleQuizQuestion> questions = 
            partnerQuizRepo.findAllByOrderByQuestionGroup_GroupNameAscQuestionNumAsc();

        List<PartnerStyleQuizQuestionDTO> result = new ArrayList<>();

        for(int i = 0; i < questions.size(); i++){
            PartnerStyleQuizQuestion question = questions.get(i);
            PartnerStyleQuizQuestionDTO dto = new PartnerStyleQuizQuestionDTO(
                question.getId(),
                question.getQuestionGroup().getGroupName(),
                question.getQuestionNum(),
                question.getQuestionText(),
                question.getQuestionDescription()
            );
            result.add(dto);
        }
        return result;
    }

    @Override 
    public void submitQuiz(Long userId, List<PartnerStyleQuizSubmissionDTO> answers){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        for (int i = 0; i < answers.size(); i++) {
            PartnerStyleQuizSubmissionDTO a = answers.get(i);

            PartnerStyleQuizQuestion question =
                    partnerQuizRepo.findById(a.questionId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));

            PartnerStyleQuizResponse response =
                    new PartnerStyleQuizResponse(question, user, a.answerValue());

            partnerQuizResponseRepo.save(response);
        }
    }

    @Override 
    public  PartnerStyleQuizResultsDTO getResults(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        List<PartnerStyleQuizResponse> responses = 
            partnerQuizResponseRepo.findByUser(user);
        
        if(responses.isEmpty()){
            return null; 
        }
        // init scores 
        HashMap<PartnerStyleQuestionGroup.Groups, Integer> groupScores = new HashMap<>();
        groupScores.put(PartnerStyleQuestionGroup.Groups.AVOIDANT, 0);
        groupScores.put(PartnerStyleQuestionGroup.Groups.SECURE, 0);
        groupScores.put(PartnerStyleQuestionGroup.Groups.ANXIOUS, 0);

        for(int i = 0; i < responses.size(); i++){
            PartnerStyleQuizResponse r = responses.get(i);
            PartnerStyleQuestionGroup.Groups group = r.getQuestion().getQuestionGroup().getGroupName();
            groupScores.put(group, groupScores.get(group) + r.getAnswerValue());
        }
        // determine style
        PartnerStyleQuestionGroup.Groups dominantGroup =
                        calculatePartnerStyle(groupScores);
        int dominantScore = dominantGroup != null ? groupScores.get(dominantGroup) : 0 ;

        String scoringKeyDesc = null;
        if(dominantGroup != null && dominantScore >= SCORING_KEY_DOMINANT){
            scoringKeyDesc = 
                    partnerStyleGroupRepo
                    .findByGroupName(dominantGroup)
                    .orElseThrow()
                    .getScoringKeyDesc();
        }
        return new PartnerStyleQuizResultsDTO(groupScores,dominantGroup, scoringKeyDesc);
    }

    // private helper to calculate and return accurate style:
    private PartnerStyleQuestionGroup.Groups calculatePartnerStyle(HashMap<PartnerStyleQuestionGroup.Groups, Integer> results){
        if(hasEqualGroupScores(results)){
            // proceed to golden rule for better assessment:
            return null; // return null for now
        }
        // find highest
        PartnerStyleQuestionGroup.Groups style = null;
        int highest = Integer.MIN_VALUE;
        for (Map.Entry<PartnerStyleQuestionGroup.Groups, Integer> entry : results.entrySet()) {
            if (entry.getValue() > highest) {
                highest = entry.getValue();
                style = entry.getKey();
            }
        }
        return style;
    }
    // private function helper checks if 2 groups results are above 23: proceed to golden rules for better assessment
    private boolean hasEqualGroupScores(HashMap<PartnerStyleQuestionGroup.Groups, Integer> results){
        Set<Integer> seen = new HashSet<>();
        for(Integer score : results.values()){
            if(!seen.add(score)){ // if this fails then more than one group has the same value
                return true;
            }
        }
        return false;
    }
}