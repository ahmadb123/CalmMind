package com.calmmind.backend.service;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.AttachmentStyle;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @Override 
    public User registerUser(String username, String email, String password, AttachmentStyle style) {
        // Validation
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
        
        // Check if username already exists
        if (userRepo.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }
        
        // Create and save new user
        User newUser = new User(username, email, password, style);
        return userRepo.save(newUser);
    }
    @Override 
    public User loginUser(String username, String password){
        /*
         * Check both username and password:
         */
        // when frontend enters username and password: 
        User user = userRepo.findByUsername(username).orElse(null); // get username from repo
        if(user == null){ // not found? 
            throw new IllegalArgumentException("Invalid username or password");
        }
        if(user.getPassword().equals(password)){
            System.out.println("DB Password: '" + user.getPassword() + "'");
            System.out.println("Entered Password: '" + password + "'");
            return user;
        } else {
            throw new IllegalArgumentException("Invalid username or password");
        }
    }

    @Override 
    public User getUserByUsername(String username){
        // use userRepo to find user by username
        return userRepo.findByUsername(username).orElse(null);
    }
    @Override 
    public User getUserById(Long id){
        return userRepo.findById(id).isPresent() ? userRepo.findById(id).get() : null;
    }
    @Override 
    public boolean isUsernameAvailable(String username){
        return !userRepo.existsByUsername(username);
    }
    @Override 
    public void updateUserAttachmentStyle(Long userId, String quizStyle){
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        AttachmentStyle attachmentStyle = mapQuizStyleAttachmentStyle(quizStyle);
        user.setAttachmentStyle(attachmentStyle);
        userRepo.save(user);
    }
    @Override 
    // deleting user should delete all related data (quiz results, responses, affirmations, etc.)
    public void deleteUser(Long id){
        userRepo.deleteById(id);
    }

    private AttachmentStyle mapQuizStyleAttachmentStyle(String quizStyle){
        return switch(quizStyle){
            case "A" -> AttachmentStyle.ANXIOUS;
            case "B" -> AttachmentStyle.SECURE;
            case "C" -> AttachmentStyle.AVOIDANT;
            default -> AttachmentStyle.GENERAL;
        };
    }
}
