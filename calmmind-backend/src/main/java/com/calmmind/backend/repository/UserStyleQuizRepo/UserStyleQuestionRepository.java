package com.calmmind.backend.repository.UserStyleQuizRepo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion.AnswerOptions;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import java.util.Optional;

public interface UserStyleQuestionRepository extends JpaRepository<UserStyleQuestion, Long> {
    Optional<UserStyleQuestion> findByOptions(AnswerOptions groupName);
}