package com.calmmind.backend.service;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.AttachmentStyle;

public interface IUserService {
    // Define user-related service methods here
    User registerUser(String username, String email, String password, AttachmentStyle style);
    User loginUser(String username, String password);
    User getUserByUsername(String username);
    User getUserById(Long id);
    boolean isUsernameAvailable(String username);
    void updateUserAttachmentStyle(Long userId, String quizStyle);
    void deleteUser(Long id);
}