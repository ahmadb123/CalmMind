package com.calmmind.backend.service.UserStyleQuizService;
import com.calmmind.backend.dto.UserStyleQuizDTO;
import com.calmmind.backend.dto.UserStyleQuizSubmissionDTO;
import com.calmmind.backend.dto.UserStyleQuizResultsDTO;
import java.util.List;
import java.util.Map;

public interface IUserStyleQuizService{
    // retrieve all user style questions(quiz)
    List<UserStyleQuizDTO> getQuiz();
    // submit quiz 
    void submitQuiz(Long userId, List<UserStyleQuizSubmissionDTO> answers);
    // get computed quiz results
    UserStyleQuizResultsDTO getResults(Long userId);
}   