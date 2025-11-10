package com.calmmind.backend.service;
import java.util.List;
import java.util.Map;
import com.calmmind.backend.model.QuizQuestion;
import com.calmmind.backend.model.User;
import com.calmmind.backend.dto.QuizResultDTO;
import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.quiz.QuizResponse;
import com.calmmind.backend.quiz.QuizResult;
import com.calmmind.backend.quiz.calculator.AttachmentStyleCalculator;
import com.calmmind.backend.repository.QuizResultRepository;
import com.calmmind.backend.repository.QuizQuestionRepository;
import com.calmmind.backend.repository.UserRepository;
import com.calmmind.backend.repository.QuizResponseRepository;
import com.calmmind.backend.service.IQuizService;
import com.calmmind.backend.dto.QuizResultDTO;
import org.springframework.stereotype.Service;

@Service
public class QuizService implements IQuizService {
    private final QuizResultRepository quizResultRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final UserRepository userRepository;
    private final QuizResponseRepository quizResponseRepository;
    private final AttachmentStyleCalculator calculator;

    public QuizService(QuizResultRepository quizResultRepository,
                        QuizQuestionRepository quizQuestionRepository,
                        UserRepository userRepository,
                        QuizResponseRepository quizResponseRepository) {
        this.quizResultRepository = quizResultRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.userRepository = userRepository;
        this.quizResponseRepository = quizResponseRepository;
        this.calculator = new AttachmentStyleCalculator();
    }
    // Service methods would be defined here
    /*
     * Initial flow 
     * user clicks to take quiz
     * output: 12 questions from database
     */
    @Override 
    public List<QuizQuestion> getQuizQuestions(){
        return quizQuestionRepository.findAll();
    }

    /*
     * After retrieving questions
     * user takes quiz and submits answers
     * output: quiz submitted to database and result calculated
     */
    @Override 
    public QuizResultDTO submitQuiz(Long userId, Map<Integer,Integer> answers){
        // few things to check
        // 1. validate user exists
        userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        // all questions answered?
        if(answers.size() != 12){
            throw new IllegalArgumentException("All 12 questions must be answered");
        }
        // save each answer as QuizResponse
        for(Map.Entry<Integer,Integer> entry : answers.entrySet()){
            Integer questionId = entry.getKey();
            Integer questionAnswer = entry.getValue();
            QuizResponse response = new QuizResponse(userId, questionId.longValue(), questionAnswer);
            if(!response.validate()){
                throw new IllegalArgumentException("Invalid answer for question " + questionId);
            }
            quizResponseRepository.save(response);
        }
        // calculate response 
        QuizResult result = calculator.calculateResult(userId, answers);
        if(!result.validate()){
            throw new IllegalArgumentException("Calculated quiz result is invalid");
        }
        // save result to database
        quizResultRepository.save(result);
        // update user profile with attachment style
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setAttachmentStyle(result.getAttachmentStyle());
        userRepository.save(user);

        return new QuizResultDTO(
            result.getUserId(),
            result.getAttachmentStyle(),
            result.getAnxietyScore(),
            result.getAvoidanceScore()
        );
        }

    @Override 
    public QuizResultDTO getQuizResult(Long userId){
        // user might have multiple results?
        List<QuizResult> results = quizResultRepository.findByUserId(userId);
        if(results.isEmpty()){
            throw new IllegalArgumentException("Quiz result not found for user");
        }
        // get latest result
        QuizResult result = results.get(results.size() - 1);
        return new QuizResultDTO(
            result.getUserId(),
            result.getAttachmentStyle(),
            result.getAnxietyScore(),
            result.getAvoidanceScore()
        );
       
    }

    @Override 
    public boolean hasUserTakenQuiz(Long userId){
        return quizResultRepository.existsByUserId(userId);
    }

    @Override 
    public void retakeQuiz(Long userId){
        // delete previous quiz result
        quizResultRepository.deleteByUserId(userId);
        // delete previous quiz responses
        quizResponseRepository.deleteByUserId(userId);
        // clear user attachment style
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setAttachmentStyle(null);
        userRepository.save(user);
    }
}