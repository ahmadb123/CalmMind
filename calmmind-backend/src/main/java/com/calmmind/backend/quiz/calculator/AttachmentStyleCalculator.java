package com.calmmind.backend.quiz.calculator;

import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.quiz.QuizResult;
import com.calmmind.backend.quiz.AnxietyScoringStrategy;
import com.calmmind.backend.quiz.AvoidanceScoringStrategy;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
/*
 * Calculator for determining attachment style based on quiz answers.
 */
public class AttachmentStyleCalculator {
    /*
        * Uses: AnxietyScoringStrategy
        * Uses: AvoidanceScoringStrategy
    */

    private final AnxietyScoringStrategy anxietyStrategy;
    private final AvoidanceScoringStrategy avoidanceStrategy;

    public AttachmentStyleCalculator() {
        this.anxietyStrategy = new AnxietyScoringStrategy();
        this.avoidanceStrategy = new AvoidanceScoringStrategy();
    }

    public QuizResult calculateResult(Long userId, Map<Integer, Integer> answers){
        if(answers == null || answers.size() != 12){
            throw new IllegalArgumentException("Answers map must contain exactly 12 entries for attachment style quiz.");
        }
        List<Integer> anxietyAnswers = new ArrayList<>();
        List<Integer> avoidanceAnswers = new ArrayList<>();
        for(Map.Entry<Integer,Integer> entry : answers.entrySet()){
            Integer questionId = entry.getKey();
            Integer answerValue = entry.getValue();
            if(questionId >= 1 && questionId <= 6){
                anxietyAnswers.add(answerValue);
            } else if(questionId >= 7 && questionId <= 12){
                avoidanceAnswers.add(answerValue);
            } else {
                throw new IllegalArgumentException("Invalid question ID: " + questionId);
            }
        }
        // calculate scores
        Double anxietyScore = anxietyStrategy.calculateScore(anxietyAnswers);
        Double avoidanceScore = avoidanceStrategy.calculateScore(avoidanceAnswers);
        // determine style:
        AttachmentStyle style = determineStyle(anxietyScore, avoidanceScore);
        return new QuizResult(userId, anxietyScore, avoidanceScore, style);

    }

    private AttachmentStyle determineStyle(Double anxiety, Double avoidance){
        /*
         * Anxiety < 3.5 && Avoidance < 3.5 → ?
            Anxiety >= 3.5 && Avoidance < 3.5 → ?
            Anxiety < 3.5 && Avoidance >= 3.5 → ?
            Anxiety >= 3.5 && Avoidance >= 3.5 → ?
         */
        if(anxiety < 3.5 && avoidance < 3.5){
            return AttachmentStyle.SECURE;
        } else if(anxiety >= 3.5 && avoidance < 3.5){
            return AttachmentStyle.ANXIOUS;
        } else if(anxiety < 3.5 && avoidance >= 3.5){
            return AttachmentStyle.AVOIDANT;
        } else {
            return AttachmentStyle.FEARFUL_AVOIDANT;    
        }
    }

}