package com.calmmind.backend.quiz;

import java.util.List;
import com.calmmind.backend.quiz.strategy.ScoringStrategy;

public class AnxietyScoringStrategy implements ScoringStrategy {
    /*
     * Calculates average of 6 anxiety answers
     */
    @Override
    public double calculateScore(List<Integer> answers){
        if(answers == null || answers.isEmpty()){
            throw new IllegalArgumentException("Answers list must contain exactly 6 entries for anxiety dimension.");
        }

        if(answers.size() != 6){
            throw new IllegalArgumentException("Answers list must contain exactly 6 entries for anxiety dimension.");
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
        return "Anxiety";
    }
}
