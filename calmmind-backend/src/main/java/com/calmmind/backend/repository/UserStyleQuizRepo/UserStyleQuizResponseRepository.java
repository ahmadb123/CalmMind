package com.calmmind.backend.repository.UserStyleQuizRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuizResponse;
import com.calmmind.backend.model.User;
import java.util.List;
public interface UserStyleQuizResponseRepository extends JpaRepository<UserStyleQuizResponse, Long>{
    List<UserStyleQuizResponse> findByUser(User user);
}