package com.calmmind.backend.service.PartnerStyleTestService;

import com.calmmind.backend.dto.PartnerStyleQuizQuestionDTO;
import java.util.List;
public interface IPartnerStyleTestService {
    // retrieve all partner style quiz questions by group
    List<PartnerStyleQuizQuestionDTO> getQuiz();
}