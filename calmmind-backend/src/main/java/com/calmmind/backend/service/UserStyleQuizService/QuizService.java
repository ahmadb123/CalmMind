package com.calmmind.backend.service.UserStyleQuizService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.calmmind.backend.dto.UserStyleQuizDTO;
import com.calmmind.backend.dto.UserStyleQuizSubmissionDTO;
import com.calmmind.backend.dto.UserStyleQuizResultsDTO;
import com.calmmind.backend.model.User;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuestion;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuiz;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuizResponse;
import com.calmmind.backend.model.UserAttachmentStyle.UserStyleQuizResults;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuestionRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizResponseRepository;
import com.calmmind.backend.repository.UserStyleQuizRepo.UserStyleQuizResultsRepository;
import com.calmmind.backend.service.IUserService;



@Service
public class QuizService implements IUserStyleQuizService {
    private final UserStyleQuizRepository userQuizRepo;
    private final UserStyleQuizResponseRepository userQuizResponseRepo;
    private final UserStyleQuestionRepository userStyleQuestionOptionRepo;
    private final UserStyleQuizResultsRepository userStyleResultsRepo;
    private final UserRepository userRepo;
    private IUserService userService;

    public QuizService(UserStyleQuizRepository userQuizRepo, UserStyleQuizResponseRepository userQuizResponseRepo, 
        UserStyleQuestionRepository userStyleQuestionOptionRepo, UserRepository userRepo, 
        UserStyleQuizResultsRepository userStyleResultsRepo, IUserService userService){
            this.userQuizRepo = userQuizRepo;
            this.userQuizResponseRepo = userQuizResponseRepo;
            this.userStyleQuestionOptionRepo = userStyleQuestionOptionRepo;
            this.userStyleResultsRepo = userStyleResultsRepo;
            this.userService = userService;
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
        // delete previous response if ANY:
        userQuizResponseRepo.deleteByUserId(userId);

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

        // calculate and save results:
        String style=  calculateAndSaveResults(user);
        userService.updateUserAttachmentStyle(userId, style);
    }

    @Override 
    public UserStyleQuizResultsDTO getResults(Long userId){
        Optional<UserStyleQuizResults> resultObject = 
            userStyleResultsRepo.findFirstByUserIdOrderByCompletedAtDesc(userId);
        
        if(resultObject.isEmpty()){
            return null;
        }

        // get results
        UserStyleQuizResults result = resultObject.get();

        HashMap<UserStyleQuestion.AnswerOptions, Integer> columnScores = new HashMap<>();
        columnScores.put(UserStyleQuestion.AnswerOptions.A, result.getScoreA());
        columnScores.put(UserStyleQuestion.AnswerOptions.B, result.getScoreB());
        columnScores.put(UserStyleQuestion.AnswerOptions.C, result.getScoreC());
        // get style
        UserStyleQuestion.AnswerOptions style = 
            UserStyleQuestion.AnswerOptions.valueOf(result.getDominantStyle());
        
        return new UserStyleQuizResultsDTO(columnScores, style, result.getScoringKeyDesc());
    }

    @Override 
    public boolean hasUserTakenQuiz(Long userId){
        return userStyleResultsRepo.existsByUserId(userId);
    }

    public String calculateAndSaveResults(User user){
        List<UserStyleQuizResponse> response = 
            userQuizResponseRepo.findByUserId(user.getId());
        
        if(response.isEmpty()){
            return "B";
        }

        HashMap<UserStyleQuestion.AnswerOptions, Integer> columnScores = new HashMap<>();

        columnScores.put(UserStyleQuestion.AnswerOptions.A, 0);
        columnScores.put(UserStyleQuestion.AnswerOptions.B, 0);
        columnScores.put(UserStyleQuestion.AnswerOptions.C, 0);

        for(int i = 0; i < response.size(); i++){
            if(response.get(i).getAnswer()){
                UserStyleQuizResponse r = response.get(i);
                UserStyleQuestion.AnswerOptions answerOption = 
                    r.getQuestion().getQuestionOptionAnswer().getOptions();
                columnScores.put(answerOption, columnScores.get(answerOption) + 1);
            }
        }
        // determine style (dominant(highest))
        UserStyleQuestion.AnswerOptions style = calculateUserStyle(columnScores);
        if(style == null){
            style = UserStyleQuestion.AnswerOptions.B;
        }

        String scoringKeyDesc = userStyleQuestionOptionRepo
            .findByOptions(style)
            .orElseThrow(() -> new RuntimeException("Scoring description not found"))
            .getScoringKeyDesc();
        // save results:
        UserStyleQuizResults result = new UserStyleQuizResults();
        result.setUser(user);
        result.setScoreA(columnScores.get(UserStyleQuestion.AnswerOptions.A));
        result.setScoreB(columnScores.get(UserStyleQuestion.AnswerOptions.B));
        result.setScoreC(columnScores.get(UserStyleQuestion.AnswerOptions.C));
        result.setDominantStyle(style.name());
        result.setScoringKeyDesc(scoringKeyDesc);

        userStyleResultsRepo.save(result);

        return style.name();
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