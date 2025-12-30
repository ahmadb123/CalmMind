package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import com.calmmind.backend.dto.PartnerStyleQuizResponseDTO;
import com.calmmind.backend.model.User;
import java.util.List;
public interface IPartnerStyleTestService {
    // retrieve all partner style quiz questions by group
    List<PartnerStyleQuizQuestionDTO> getQuiz();
    // retrieve all responses
    List<PartnerStyleQuizResponseDTO> getResponse(User user);
}