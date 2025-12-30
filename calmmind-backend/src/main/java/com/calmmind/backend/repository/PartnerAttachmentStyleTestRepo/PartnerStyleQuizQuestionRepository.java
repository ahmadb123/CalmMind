package com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuizQuestion;
import java.util.List;

public interface PartnerStyleQuizQuestionRepository extends JpaRepository<PartnerStyleQuizQuestion, Long> {
    List<PartnerStyleQuizQuestion> findAllByOrderByQuestionGroup_GroupNameAscQuestionNumAsc();
}