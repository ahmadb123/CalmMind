import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
import { fetchQuizResults } from '../api/QuizApi';

function MyStyleScreen({route, navigation}){
    const { user, quizResults: passedQuizResults } = route.params;
    const [quizResults, setQuizResults] = useState(passedQuizResults || null);
    const [loading, setLoading] = useState(!passedQuizResults);
    const [error, setError] = useState(false);

    useEffect(() => {
        // If quiz results weren't passed, fetch them
        if (!passedQuizResults && user?.id) {
            loadQuizResults();
        }
    }, []);

    const loadQuizResults = async () => {
        try {
            const results = await fetchQuizResults(user.id);
            if (results && results.primaryStyle) {
                setQuizResults(results);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#457B9D" />
                    <Text style={styles.loadingText}>Loading your attachment style...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !quizResults || !quizResults.primaryStyle) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>
                        No attachment style information available.
                    </Text>
                    <Text style={styles.errorSubtext}>
                        Please take the quiz first to see your results.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* ✅ UPDATED: Use primaryStyle */}
                <Text style={styles.title}>
                    {quizResults.primaryStyle.replace('_', ' ')} Attachment Style
                </Text>
                
                {/* ✅ NEW: Confidence Badge */}
                {quizResults.confidence && (
                    <View style={styles.confidenceBadge}>
                        <Text style={styles.confidenceLabel}>Classification Confidence</Text>
                        <View style={styles.confidenceBarContainer}>
                            <View style={styles.confidenceBarBackground}>
                                <View 
                                    style={[
                                        styles.confidenceBarFill, 
                                        { 
                                            width: `${quizResults.confidence}%`,
                                            backgroundColor: 
                                                quizResults.confidence >= 85 ? '#2E7D32' :
                                                quizResults.confidence >= 70 ? '#FFA726' :
                                                '#FF6B6B'
                                        }
                                    ]} 
                                />
                            </View>
                            <Text style={styles.confidenceText}>
                                {Math.round(quizResults.confidence)}%
                            </Text>
                        </View>
                        
                        {/* ✅ NEW: Borderline warning */}
                        {quizResults.isBorderline && (
                            <View style={styles.borderlineNotice}>
                                <Text style={styles.borderlineIcon}>⚠️</Text>
                                <Text style={styles.borderlineText}>
                                    Your results are borderline. Consider retaking the quiz for more clarity.
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Primary Style Description */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>About Your Style</Text>
                </View>
                
                {/* ✅ UPDATED: Use primaryDescription */}
                <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionText}>
                        {quizResults.primaryDescription || 'No description available.'}
                    </Text>
                </View>

                {/* ✅ NEW: Secondary Style (if exists) */}
                {quizResults.secondaryStyle && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Secondary Tendency</Text>
                        </View>
                        
                        <View style={[styles.descriptionCard, styles.secondaryCard]}>
                            <Text style={styles.secondaryStyleLabel}>
                                {quizResults.secondaryStyle.replace('_', ' ')}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {quizResults.secondaryDescription || 'No description available.'}
                            </Text>
                        </View>
                    </>
                )}

                {/* Dimensional Scores */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Scores</Text>
                </View>

                <View style={styles.scoresContainer}>
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Anxiety</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.anxietyScore?.toFixed(1) || 'N/A'}
                        </Text>
                        <Text style={styles.scoreMaxLabel}>out of 7</Text>
                        
                        {/* ✅ NEW: Visual score bar */}
                        <View style={styles.scoreBarBackground}>
                            <View 
                                style={[
                                    styles.scoreBarFill,
                                    { 
                                        width: `${((quizResults.anxietyScore || 0) / 7) * 100}%`,
                                        backgroundColor: quizResults.anxietyScore >= 4.2 ? '#FF6B6B' : '#4CAF50'
                                    }
                                ]} 
                            />
                        </View>
                        
                        <Text style={styles.scoreInterpretation}>
                            {quizResults.anxietyScore >= 4.2 ? 'High' : 'Low'}
                        </Text>
                    </View>
                    
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Avoidance</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.avoidanceScore?.toFixed(1) || 'N/A'}
                        </Text>
                        <Text style={styles.scoreMaxLabel}>out of 7</Text>
                        
                        {/* ✅ NEW: Visual score bar */}
                        <View style={styles.scoreBarBackground}>
                            <View 
                                style={[
                                    styles.scoreBarFill,
                                    { 
                                        width: `${((quizResults.avoidanceScore || 0) / 7) * 100}%`,
                                        backgroundColor: quizResults.avoidanceScore >= 2.9 ? '#FF6B6B' : '#4CAF50'
                                    }
                                ]} 
                            />
                        </View>
                        
                        <Text style={styles.scoreInterpretation}>
                            {quizResults.avoidanceScore >= 2.9 ? 'High' : 'Low'}
                        </Text>
                    </View>
                </View>

                {/* ✅ NEW: What This Means */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>What This Means</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>
                        {getInterpretation(quizResults)}
                    </Text>
                </View>

                {/* Spacer for footer */}
                <View style={{ height: 100 }} />
            </ScrollView>
            <AppFooter />
        </SafeAreaView>
    );
}

// ✅ NEW: Helper function to provide interpretation
function getInterpretation(results) {
    const highAnxiety = results.anxietyScore >= 4.2;
    const highAvoidance = results.avoidanceScore >= 2.9;

    if (!highAnxiety && !highAvoidance) {
        return "Your scores suggest a secure attachment pattern. You're generally comfortable with both intimacy and independence in relationships.";
    } else if (highAnxiety && !highAvoidance) {
        return "Your anxiety score is elevated, which means you may worry more about relationships and need reassurance. Your comfort with closeness is a strength.";
    } else if (!highAnxiety && highAvoidance) {
        return "Your avoidance score is elevated, suggesting you value independence highly. You might find it challenging to be vulnerable or depend on others.";
    } else {
        return "Both scores are elevated, reflecting the fearful-avoidant pattern where you desire closeness but also fear getting hurt. This push-pull dynamic is common and can be worked on with awareness.";
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 20,
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    // ✅ NEW: Confidence badge styles
    confidenceBadge: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    confidenceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        fontWeight: '500',
    },
    confidenceBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    confidenceBarBackground: {
        flex: 1,
        height: 24,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 15,
    },
    confidenceBarFill: {
        height: '100%',
        borderRadius: 12,
    },
    confidenceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D3557',
        minWidth: 50,
    },
    borderlineNotice: {
        flexDirection: 'row',
        backgroundColor: '#FFF3E0',
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#FF6B6B',
    },
    borderlineIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    borderlineText: {
        flex: 1,
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },

    sectionHeader: {
        marginTop: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1D3557',
    },
    descriptionCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    secondaryCard: {
        backgroundColor: '#F3E5F5',
        borderWidth: 2,
        borderColor: '#AB47BC',
    },
    secondaryStyleLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#AB47BC',
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    scoresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        marginBottom: 20,
    },
    scoreCard: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scoreLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    scoreValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1D3557',
    },
    scoreMaxLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 12,
    },
    // ✅ NEW: Score bar visualization
    scoreBarBackground: {
        width: '100%',
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    scoreBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    scoreInterpretation: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    // ✅ NEW: Info card
    infoCard: {
        backgroundColor: '#E3F2FD',
        padding: 20,
        borderRadius: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#42A5F5',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    errorSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});

export default MyStyleScreen;