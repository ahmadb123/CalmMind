package com.calmmind.backend.dto;

import com.calmmind.backend.model.PartnerStyleModel.PartnerStyleQuestionGroup;
import java.util.HashMap;
public record PartnerStyleQuizResultsDTO(
        HashMap<PartnerStyleQuestionGroup.Groups, Integer> groupScores,
        PartnerStyleQuestionGroup.Groups dominantGroup,
        String scoringKeyDesc
) {}
