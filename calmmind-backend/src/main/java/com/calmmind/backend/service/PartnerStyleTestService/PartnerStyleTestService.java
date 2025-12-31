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
import com.calmmind.backend.repository.UserRepository;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class PartnerStyleTestService implements IPartnerStyleTestService {
    private final PartnerStyleQuizQuestionRepository partnerQuizRepo;
    private final PartnerStyleQuizResponseRepository partnerQuizResponseRepo;
    private final UserRepository userRepository;

    public PartnerStyleTestService(PartnerStyleQuizQuestionRepository partnerQuizRepo,
                                    PartnerStyleQuizResponseRepository partnerQuizResponseRepo,
                                    UserRepository userRepository) {
        this.partnerQuizRepo = partnerQuizRepo;
        this.partnerQuizResponseRepo = partnerQuizResponseRepo;
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

        // determine dominant style
        PartnerStyleQuestionGroup.Groups dominant = null;
        int highest = Integer.MIN_VALUE;
        for(Map.Entry<PartnerStyleQuestionGroup.Groups, Integer> entry : groupScores.entrySet()){
            if(entry.getValue() > highest){
                highest = entry.getValue();
                dominant = entry.getKey();
            }
        }
        return new PartnerStyleQuizResultsDTO(groupScores,dominant);
    }
}