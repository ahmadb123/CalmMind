package com.calmmind.backend.quiz.strategy;

import java.util.List;
public interface ScoringStrategy {
    /*
     * calculateScore(List<Integer> answers): double
     */
    double calculateScore(List<Integer> answers);
    /*
     * getDimensionName(): String
     */
    String getDimensionName();
}