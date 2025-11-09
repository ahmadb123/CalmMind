import React, { useEffect, useState } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text, 
  Alert, 
  StyleSheet, 
  TouchableOpacity  // ← ADD THIS
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { fetchQuiz, submitQuiz } from '../api/QuizApi';

function QuizScreen({ route, navigation }) {
    const { user } = route.params || {};
    
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizLoading, setQuizLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // Fetch quiz questions on mount
    useEffect(() => {
        const loadQuiz = async () => {
            setQuizLoading(true);
            try {
                const fetchedQuestions = await fetchQuiz();
                setQuizQuestions(fetchedQuestions);
            } catch (error) {
                Alert.alert('Error', 'Failed to load quiz. Please try again later.');
            } finally {
                setQuizLoading(false);
            }
        };
        loadQuiz();
    }, []);

    // Handle answer selection
    const handleAnswer = (questionId, answerValue) => {
        setAnswers({ ...answers, [questionId]: answerValue });
    };

    // Go to next question
    const handleNext = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Go to previous question
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Submit quiz
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
                    onPress: () => navigation.navigate('Home', { user: { ...user, attachmentStyle: result.attachmentStyle } })
                }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to submit quiz. Please try again later.');
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    // Loading state
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
                    value={answers[currentQuestion.id]}  // ← FIXED TYPO
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
