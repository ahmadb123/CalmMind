package com.calmmind.backend.repository.PartnerAttachmentStyleTestRepo;



import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup.Groups;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface PartnerStyleQuestionGroupRepository extends JpaRepository <PartnerStyleQuestionGroup, Long> {
    Optional<PartnerStyleQuestionGroup> findByGroupName(Groups groupName);
}