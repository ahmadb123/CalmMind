package com.calmmind.backend.dto;

import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion.AnswerOptions;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import java.util.HashMap;
public record UserStyleQuizResultsDTO(
        HashMap<UserStyleQuestion.AnswerOptions, Integer> groupScores,
        UserStyleQuestion.AnswerOptions style,
        String scoringKeyDesc
) {}
