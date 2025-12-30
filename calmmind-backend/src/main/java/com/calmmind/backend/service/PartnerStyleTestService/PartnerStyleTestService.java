package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizResponseDTO;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizResponse;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizQuestionRepository;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizResponseRepository;
import com.calmmind.backend.repository.UserRepository;
import java.util.List;
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
    public List<PartnerStyleQuizResponseDTO> getResponse(User user){
        List<PartnerStyleQuizResponse> responses = partnerQuizResponseRepo.findByUser(user);
        List<PartnerStyleQuizResponseDTO> response = new ArrayList<>();

        for(int i = 0; i < responses.size(); i++){
            PartnerStyleQuizResponse r = responses.get(i);
            PartnerStyleQuizResponseDTO dto = new PartnerStyleQuizResponseDTO(
                r.getQuestion().getQuestionNum(),
                r.getAnswerValue()
            );
            response.add(dto);
        }
        return response;
    }
}