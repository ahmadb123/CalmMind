package com.calmmind.backend.quiz;

import java.util.List;
import com.calmmind.backend.quiz.strategy.ScoringStrategy;

public class AvoidanceScoringStrategy implements ScoringStrategy {
    /*
     * Calculates average of 6 avoidance answers
     */
    @Override
    public double calculateScore(List<Integer> answers){
        if(answers == null || answers.size() != 6 || answers.isEmpty()){
            throw new IllegalArgumentException("Answers list must contain exactly 6 entries for avoidance dimension.");
        }
        // calculate sum then average
        int sum = 0;
        for(Integer i = 0; i < answers.size(); i++){
            sum += answers.get(i);
        }
        return (double) sum / answers.size();
    }
    @Override 
    public String getDimensionName(){
        return "Avoidance";
    }
}