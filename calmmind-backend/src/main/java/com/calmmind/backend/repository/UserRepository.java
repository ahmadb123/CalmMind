package com.calmmind.backend.repository;
import com.calmmind.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    // check if user exists 
    boolean existsByUsername(String username);
    // find by username 
    Optional<User> findByUsername(String username);
}
