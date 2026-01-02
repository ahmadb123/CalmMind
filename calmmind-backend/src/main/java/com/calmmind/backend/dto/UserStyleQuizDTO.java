package com.calmmind.backend.dto;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion.AnswerOptions;
import java.util.List;
public record UserStyleQuizDTO(Long questionId, AnswerOptions answerOption, Integer questionNum,
    String questionText)
{}