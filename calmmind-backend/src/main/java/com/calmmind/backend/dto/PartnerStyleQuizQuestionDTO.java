package com.calmmind.backend.dto;
import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup.Groups;
import java.util.List;
public record PartnerStyleQuizQuestionDTO(Groups group, int questionNum,
    String questionText, List<String> descriptions)
{}