package com.calmmind.backend.repository.UserStyleQuizRepo;

import java.util.List;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuizResults;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.calmmind.backend.model.User;
public interface UserStyleQuizResultsRepository extends JpaRepository<UserStyleQuizResults, Long>{
    // find most recent result by user id
    Optional<UserStyleQuizResults> findFirstByUserIdOrderByCompletedAtDesc(Long userId);
    // find all results by user id
    List<UserStyleQuizResults> findByUserId(User user);
    // delete results by user id
    void deleteByUserId(Long userId);
    // check how many results user has
    Long countByUserId(Long userId);
    // if any results exist
    boolean existsByUserId(Long userId);
}