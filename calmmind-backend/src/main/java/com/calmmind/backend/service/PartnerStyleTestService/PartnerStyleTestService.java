package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo.PartnerStyleQuizQuestionRepository;
import java.util.List;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class PartnerStyleTestService implements IPartnerStyleTestService {
    private final PartnerStyleQuizQuestionRepository partnerQuizRepo;

    public PartnerStyleTestService(PartnerStyleQuizQuestionRepository partnerQuizRepo){
        this.partnerQuizRepo = partnerQuizRepo;
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
}