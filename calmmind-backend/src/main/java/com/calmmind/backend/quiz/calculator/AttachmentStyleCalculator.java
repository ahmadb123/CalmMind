
package com.calmmind.backend.quiz.calculator;

import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.quiz.QuizResult;
import com.calmmind.backend.quiz.AnxietyScoringStrategy;
import com.calmmind.backend.quiz.AvoidanceScoringStrategy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Research-aligned attachment style calculator (Version A).
 * 
 * Features:
 *  - Updated thresholds (more accurate classification)
 *  - Borderline detection
 *  - Confidence scoring (non-inflated)
 *  - Insecurity index
 *  - Clear separation of logic
 */
public class AttachmentStyleCalculator {

    /** 
     * Updated empirical thresholds (Option 2)
     * These values produce MUCH more accurate classifications.
     */
    private static final double ANXIETY_THRESHOLD = 5.0;
    private static final double AVOIDANCE_THRESHOLD = 5.0;

    /** 
     * Borderline zone (±0.7 around thresholds).
     * Helps avoid false Fearful-Avoidant results.
     */
    private static final double BUFFER_ZONE = 0.7;

    private final AnxietyScoringStrategy anxietyStrategy = new AnxietyScoringStrategy();
    private final AvoidanceScoringStrategy avoidanceStrategy = new AvoidanceScoringStrategy();

    // ================================================================
    // MAIN CALCULATION
    // ================================================================
    public QuizResult calculateResult(Long userId, Map<Integer, Integer> answers) {

        validateAnswers(answers);

        List<Integer> anxietyAnswers = extractAnswers(answers, 1, 6);
        List<Integer> avoidanceAnswers = extractAnswers(answers, 7, 12);

        double anxiety = anxietyStrategy.calculateScore(anxietyAnswers);
        double avoidance = avoidanceStrategy.calculateScore(avoidanceAnswers);

        StyleResult style = classify(anxiety, avoidance);

        double confidence = calculateConfidence(anxiety, avoidance, style);
        double insecurityIndex = calculateInsecurityIndex(anxiety, avoidance);

        return new QuizResult(
                userId,
                anxiety,
                avoidance,
                style.primary,
                style.secondary,
                confidence,
                insecurityIndex
        );
    }

    // ================================================================
    // CLASSIFICATION LOGIC
    // ================================================================
    private StyleResult classify(double anxiety, double avoidance) {

        boolean highAnx = anxiety >= ANXIETY_THRESHOLD;
        boolean highAvoid = avoidance >= AVOIDANCE_THRESHOLD;

        boolean borderlineAnx =
                Math.abs(anxiety - ANXIETY_THRESHOLD) <= BUFFER_ZONE;

        boolean borderlineAvoid =
                Math.abs(avoidance - AVOIDANCE_THRESHOLD) <= BUFFER_ZONE;

        // -------------------------------
        // FEARFUL-AVOIDANT (High–High only)
        // -------------------------------
        if (highAnx && highAvoid) {
            return new StyleResult(AttachmentStyle.FEARFUL_AVOIDANT, null);
        }

        // -------------------------------
        // ANXIOUS (High anxiety, not-high avoidance)
        // -------------------------------
        if (highAnx && !highAvoid) {
            AttachmentStyle secondary = borderlineAvoid ? AttachmentStyle.AVOIDANT : null;
            return new StyleResult(AttachmentStyle.ANXIOUS, secondary);
        }

        // -------------------------------
        // AVOIDANT (High avoidance, not-high anxiety)
        // -------------------------------
        if (!highAnx && highAvoid) {
            AttachmentStyle secondary = borderlineAnx ? AttachmentStyle.ANXIOUS : null;
            return new StyleResult(AttachmentStyle.AVOIDANT, secondary);
        }

        // -------------------------------
        // SECURE (Low–Low)
        // Borderlines may show a slight secondary tendency
        // -------------------------------
        AttachmentStyle secondary = null;
        if (borderlineAnx) secondary = AttachmentStyle.ANXIOUS;
        if (borderlineAvoid) secondary = AttachmentStyle.AVOIDANT;

        return new StyleResult(AttachmentStyle.SECURE, secondary);
    }

    // ================================================================
    // CONFIDENCE SCORING
    // ================================================================
    private double calculateConfidence(double anxiety, double avoidance, StyleResult result) {

        double base = 90.0;  // start at 90%

        // Borderline lowers confidence substantially
        if (Math.abs(anxiety - ANXIETY_THRESHOLD) <= BUFFER_ZONE) base -= 12;
        if (Math.abs(avoidance - AVOIDANCE_THRESHOLD) <= BUFFER_ZONE) base -= 12;

        // Lower bonus strength (was too strong before)
        double distA = Math.abs(anxiety - ANXIETY_THRESHOLD) / 2.0;
        double distB = Math.abs(avoidance - AVOIDANCE_THRESHOLD) / 2.0;

        double bonus = (distA + distB) * 7.0;   // reduced bonus multiplier
        base += bonus;

        // Very strong Secure → higher confidence
        if (result.primary == AttachmentStyle.SECURE && anxiety < 2.5 && avoidance < 2.5) {
            base = 95.0;
        }

        // Very strong Fearful Avoidant → high confidence
        if (result.primary == AttachmentStyle.FEARFUL_AVOIDANT && anxiety > 6.0 && avoidance > 6.0) {
            base = 94.0;
        }

        // Clamp to 50–100%
        return Math.max(50.0, Math.min(100.0, base));
    }

    // ================================================================
    // INSECURITY INDEX (0–100)
    // ================================================================
    private double calculateInsecurityIndex(double anxiety, double avoidance) {
        double avg = (anxiety + avoidance) / 2.0;
        return Math.min(100.0, Math.max(0.0, avg / 7.0 * 100));
    }

    // ================================================================
    // SUPPORT FUNCTIONS
    // ================================================================
    private void validateAnswers(Map<Integer, Integer> answers) {
        if (answers == null || answers.size() != 12) {
            throw new IllegalArgumentException("Must have exactly 12 answers.");
        }

        for (int v : answers.values()) {
            if (v < 1 || v > 7) {
                throw new IllegalArgumentException("Answers must be 1–7.");
            }
        }
    }

    private List<Integer> extractAnswers(Map<Integer, Integer> map, int start, int end) {
        List<Integer> out = new ArrayList<>();
        for (int i = start; i <= end; i++) {
            out.add(map.get(i));
        }
        return out;
    }

    // ================================================================
    // DATA HOLDER
    // ================================================================
    private static class StyleResult {
        AttachmentStyle primary;
        AttachmentStyle secondary;

        StyleResult(AttachmentStyle p, AttachmentStyle s) {
            this.primary = p;
            this.secondary = s;
        }
    }
}
