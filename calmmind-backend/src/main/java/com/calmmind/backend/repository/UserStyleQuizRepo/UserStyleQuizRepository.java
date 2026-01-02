package com.calmmind.backend.repository.UserStyleQuizRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuiz;
import java.util.List;

public interface UserStyleQuizRepository extends JpaRepository<UserStyleQuiz, Long> {
}