package com.calmmind.backend.service.UserStyleQuizService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.calmmind.backend.dto.UserStyleQuizDTO;
import com.calmmind.backend.dto.UserStyleQuizSubmissionDTO;
import com.calmmind.backend.dto.UserStyleQuizResultsDTO;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuiz;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuizResponse;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuestionRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizResponseRepository;


@Service
public class QuizService implements IUserStyleQuizService {
    private final UserStyleQuizRepository userQuizRepo;
    private final UserStyleQuizResponseRepository userQuizResponseRepo;
    private final UserStyleQuestionRepository userStyleQuestionOptionRepo;
    private final UserRepository userRepo;

    public QuizService(UserStyleQuizRepository userQuizRepo, UserStyleQuizResponseRepository userQuizResponseRepo, 
        UserStyleQuestionRepository userStyleQuestionOptionRepo, UserRepository userRepo){
            this.userQuizRepo = userQuizRepo;
            this.userQuizResponseRepo = userQuizResponseRepo;
            this.userStyleQuestionOptionRepo = userStyleQuestionOptionRepo;
            this.userRepo = userRepo;
        }

    @Override 
    public List<UserStyleQuizDTO> getQuiz(){
        List<UserStyleQuiz> questions = 
            userQuizRepo.findAll();
        if(questions.isEmpty()){
            System.out.println("Error catching quiz");
            return List.of();
        }
        List<UserStyleQuizDTO> result = new ArrayList<>();
        for(int i = 0; i < questions.size(); i++){
            UserStyleQuiz question = questions.get(i);
            UserStyleQuizDTO dto = new UserStyleQuizDTO(
                question.getId(),
                question.getQuestionOptionAnswer().getOptions(),
                question.getQuestionNum(),
                question.getQuestionText()
            );
            result.add(dto);
        }
        return result;
    }

    @Override 
    @Transactional
    public void submitQuiz(Long userId, List<UserStyleQuizSubmissionDTO> answers){
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        for(int i = 0; i < answers.size(); i++){
            UserStyleQuizSubmissionDTO a = answers.get(i);
            // check if the answer ID matches the question ID
            UserStyleQuiz question = 
                userQuizRepo.findById(a.questionId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));
            UserStyleQuizResponse response = 
                new UserStyleQuizResponse(question, user, a.answerValue());
            
            userQuizResponseRepo.save(response);
        }
    }

    @Override 
    public UserStyleQuizResultsDTO getResults(Long userId){
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        // get response:

        List<UserStyleQuizResponse> responses = 
            userQuizResponseRepo.findByUser(user);

        if(responses.isEmpty()){
            return null;
        }

        HashMap<UserStyleQuestion.AnswerOptions, Integer> columnScores = new HashMap<>();
        columnScores.put(UserStyleQuestion.AnswerOptions.A, 0);
        columnScores.put(UserStyleQuestion.AnswerOptions.B, 0);
        columnScores.put(UserStyleQuestion.AnswerOptions.C, 0);

        for(int i = 0; i < responses.size(); i++){
            UserStyleQuizResponse r = responses.get(i);
            // Get which column this question belongs to
            UserStyleQuestion.AnswerOptions answerOption = r.getQuestion().getQuestionOptionAnswer().getOptions(); // return enum
            int increment = r.getAnswer() ? 1 : 0; // return true or false
            columnScores.put(answerOption, columnScores.get(answerOption) + increment);
        }
        // determine which column has most scores:
        UserStyleQuestion.AnswerOptions style = 
            calculateUserStyle(columnScores);
        
        Integer score = style != null ? columnScores.get(style) : 0 ;

        String scoringKeyDesc = null;
        if(score > 0 && style != null){
            scoringKeyDesc =
                userStyleQuestionOptionRepo
                .findByOptions(style)
                .orElseThrow()
                .getScoringKeyDesc();
        }
        return new UserStyleQuizResultsDTO(columnScores, style, scoringKeyDesc);
    }


    // calculate answers
    private static UserStyleQuestion.AnswerOptions calculateUserStyle(HashMap<UserStyleQuestion.AnswerOptions, Integer> results){
        // find highest
        int highest = Integer.MIN_VALUE;
        UserStyleQuestion.AnswerOptions style = null;
        for(Map.Entry<UserStyleQuestion.AnswerOptions, Integer> entry: results.entrySet()){
            if(entry.getValue() > highest){
                highest = entry.getValue();
                style = entry.getKey();
            }
        }
        return style;
    }
}