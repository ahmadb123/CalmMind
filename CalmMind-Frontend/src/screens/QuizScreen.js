import React, { useEffect, useState } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text, 
  Alert, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { fetchQuiz, submitQuiz, fetchQuizResults } from '../api/QuizApi';

function QuizScreen({ route, navigation }) {
    const { user } = route.params || {};
    if(!user){
        Alert.alert('Error', 'User not found. Please log in again.');
        navigation.navigate('Login');
        return null;
    }
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizLoading, setQuizLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [hasResults, setHasResults] = useState(false);
    const [quizResults, setQuizResults] = useState(null);
    const [showingQuiz, setShowingQuiz] = useState(true);

    useEffect(() => {
        const checkQuizStatus = async () => {
            if(!user?.id) {
                Alert.alert('Error', 'User not found. Please log in again.');
                navigation.navigate('Login');
                return;
            }
            setQuizLoading(true);
            try{
                const results = await fetchQuizResults(user.id);
                // ✅ UPDATED: Check for primaryStyle instead of attachmentStyle
                if(results && results.primaryStyle){
                    setHasResults(true);
                    setQuizResults(results);
                    setShowingQuiz(false);
                }
                else{
                    await loadQuiz();
                }
            }catch(error){
                await loadQuiz();
            }finally{
                setQuizLoading(false);
            }
        };
        checkQuizStatus();
    }, []);

    const loadQuiz = async () => {
        try {
            const fetchedQuestions = await fetchQuiz();
            setQuizQuestions(fetchedQuestions);
            setShowingQuiz(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to load quiz questions. Please try again later.');
            console.error('Error loading quiz:', error);
        } finally {
            setQuizLoading(false);
        }
    };

    const handleRetakeQuiz = async () => {
        Alert.alert('Retake Quiz', 'Are you sure you want to retake the quiz?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: async () => {
                    setShowingQuiz(true);
                    setHasResults(false);
                    setQuizResults(null);
                    setAnswers({});
                    setCurrentQuestionIndex(0);
                    await loadQuiz();
                },
            },
        ]);
    };

    const handleAnswer = (questionId, answerValue) => {
        setAnswers({ ...answers, [questionId]: answerValue });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < quizQuestions.length) {
            Alert.alert('Incomplete', 'Please answer all questions before submitting.');
            return;
        }
        
        setSubmitting(true);
        
        try {
            const result = await submitQuiz(user.id, answers);
            
            Alert.alert('Success!', 'Quiz submitted successfully!', [
                {
                    text: 'View Results',
                    // ✅ UPDATED: Use primaryStyle
                    onPress: () => navigation.navigate('Home', { 
                        user: { ...user, attachmentStyle: result.primaryStyle } 
                    })
                }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to submit quiz. Please try again later.');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (quizLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#A8DADC" />
                    <Text style={styles.loadingText}>Loading quiz questions...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // ✅ UPDATED: Enhanced results display with new fields
    if(hasResults && !showingQuiz && quizResults){
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Your Quiz Results</Text>
                    
                    {/* Primary Attachment Style */}
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Primary Attachment Style</Text>
                        <Text style={styles.resultValue}>
                            {quizResults.primaryStyle?.replace('_', ' ') || 'N/A'}
                        </Text>
                        {quizResults.primaryDescription && (
                            <Text style={styles.resultDescription}>
                                {quizResults.primaryDescription}
                            </Text>
                        )}
                    </View>

                    {/* ✅ NEW: Secondary Style (if exists) */}
                    {quizResults.secondaryStyle && (
                        <View style={[styles.resultCard, styles.secondaryCard]}>
                            <Text style={styles.resultLabel}>Secondary Tendency</Text>
                            <Text style={styles.secondaryValue}>
                                {quizResults.secondaryStyle.replace('_', ' ')}
                            </Text>
                            {quizResults.secondaryDescription && (
                                <Text style={styles.resultDescription}>
                                    {quizResults.secondaryDescription}
                                </Text>
                            )}
                        </View>
                    )}

                    {/* ✅ NEW: Confidence Indicator */}
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Classification Confidence</Text>
                        <View style={styles.confidenceContainer}>
                            <View style={styles.confidenceBarBackground}>
                                <View 
                                    style={[
                                        styles.confidenceBarFill, 
                                        { 
                                            width: `${quizResults.confidence || 0}%`,
                                            backgroundColor: 
                                                quizResults.confidence >= 85 ? '#2E7D32' :
                                                quizResults.confidence >= 70 ? '#FFA726' :
                                                '#FF6B6B'
                                        }
                                    ]} 
                                />
                            </View>
                            <Text style={styles.confidenceText}>
                                {Math.round(quizResults.confidence || 0)}%
                            </Text>
                        </View>
                        
                        {/* ✅ NEW: Borderline warning */}
                        {quizResults.isBorderline && (
                            <View style={styles.borderlineWarning}>
                                <Text style={styles.borderlineIcon}>⚠️</Text>
                                <Text style={styles.borderlineText}>
                                    Your results are borderline. Consider retaking the quiz for more clarity.
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Dimensional Scores */}
                    <View style={styles.scoresRow}>
                        <View style={styles.scoreCard}>
                            <Text style={styles.scoreLabel}>Anxiety</Text>
                            <Text style={styles.scoreValue}>
                                {quizResults.anxietyScore?.toFixed(1) || 'N/A'}/7
                            </Text>
                        </View>

                        <View style={styles.scoreCard}>
                            <Text style={styles.scoreLabel}>Avoidance</Text>
                            <Text style={styles.scoreValue}>
                                {quizResults.avoidanceScore?.toFixed(1) || 'N/A'}/7
                            </Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={handleRetakeQuiz}
                    >
                        <Text style={styles.retakeButtonText}>🔄 Retake Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home', { 
                            user: { ...user, attachmentStyle: quizResults.primaryStyle } 
                        })}
                    >
                        <Text style={styles.homeButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                    
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (!quizQuestions || quizQuestions.length === 0) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>No quiz questions available.</Text>
                    <TouchableOpacity 
                        style={styles.retakeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.retakeButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const isAnswered = answers[currentQuestion?.id] !== undefined;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                <ProgressBar
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={quizQuestions.length}
                />
                
                <QuestionCard
                    question={currentQuestion}
                    value={answers[currentQuestion.id]} 
                    onAnswer={(val) => handleAnswer(currentQuestion.id, val)}
                    disabled={submitting}
                />
                
                <View style={styles.navigationButtons}>
                    
                    {!isFirstQuestion && (
                        <TouchableOpacity 
                            onPress={handlePrevious}
                            style={styles.navButton}
                        >
                            <Text style={styles.navButtonText}>← Previous</Text>
                        </TouchableOpacity>
                    )}
                    
                    {!isLastQuestion && (
                        <TouchableOpacity
                            onPress={handleNext}
                            style={[styles.navButton, styles.primaryButton]}
                            disabled={!isAnswered}
                        >
                            <Text style={styles.navButtonText}>Next →</Text>
                        </TouchableOpacity>
                    )}
                    
                    {isLastQuestion && (
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={[styles.navButton, styles.submitButton]}
                            disabled={!isAnswered || submitting}
                        >
                            <Text style={styles.navButtonText}>
                                {submitting ? 'Submitting...' : 'Submit Quiz'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    resultsContainer: {
        padding: 20,
        alignItems: 'center',
    },
    resultsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 30,
        marginTop: 20,
    },
    resultCard: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    // ✅ NEW: Secondary style card styling
    secondaryCard: {
        backgroundColor: '#F3E5F5',
        borderWidth: 2,
        borderColor: '#AB47BC',
    },
    resultLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        fontWeight: '500',
    },
    resultValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D3557',
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    // ✅ NEW: Secondary value styling
    secondaryValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#AB47BC',
        textTransform: 'capitalize',
        marginBottom: 10,
    },
    // ✅ NEW: Description text
    resultDescription: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginTop: 8,
        fontStyle: 'italic',
    },
    // ✅ NEW: Confidence display
    confidenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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
    // ✅ NEW: Borderline warning
    borderlineWarning: {
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
        fontSize: 20,
        marginRight: 10,
    },
    borderlineText: {
        flex: 1,
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    // ✅ NEW: Dimensional scores side-by-side
    scoresRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    scoreCard: {
        backgroundColor: '#E3F2FD',
        width: '48%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#42A5F5',
    },
    scoreLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    scoreValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D3557',
    },
    retakeButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    retakeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    homeButton: {
        backgroundColor: '#A8DADC',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#1D3557',
        fontSize: 18,
        fontWeight: '600',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    navButton: {
        backgroundColor: '#A8DADC',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#457B9D',
    },
    submitButton: {
        backgroundColor: '#2E7D32',
    },
    navButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default QuizScreen;