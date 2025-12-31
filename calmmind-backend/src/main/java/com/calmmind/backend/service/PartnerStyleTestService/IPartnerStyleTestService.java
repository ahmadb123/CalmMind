package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizSubmissionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizResultsDTO;
import com.calmmind.backend.model.User;
import java.util.List;
public interface IPartnerStyleTestService {
    // retrieve all partner style quiz questions by group
    List<PartnerStyleQuizQuestionDTO> getQuiz();
    // submit quiz answer 
    void submitQuiz(Long userId, List<PartnerStyleQuizSubmissionDTO> answers);
    // get computed quiz results
    PartnerStyleQuizResultsDTO getResults(Long userId);
}