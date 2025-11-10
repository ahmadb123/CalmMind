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
    
    const[hasResults, setHasResults] = useState(false);
    const[quizResults, setQuizResults] = useState(null);
    const[showingQuiz, setShowingQuiz] = useState(true);
    // Fetch quiz questions on mount 
    // check if user has already taken the quiz 

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
                if(results && results.attachmentStyle){
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

    // handle retake quiz:
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

      if(hasResults && !showingQuiz && quizResults){
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Your Quiz Results</Text>
                    
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Attachment Style</Text>
                        <Text style={styles.resultValue}>
                            {quizResults.attachmentStyle.replace('_', ' ')}
                        </Text>
                    </View>

                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Anxiety Score</Text>
                        <Text style={styles.resultValue}>
                            {quizResults.anxietyScore?.toFixed(2) || 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Avoidance Score</Text>
                        <Text style={styles.resultValue}>
                            {quizResults.avoidanceScore?.toFixed(2) || 'N/A'}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={handleRetakeQuiz}
                    >
                        <Text style={styles.retakeButtonText}>Retake Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home', { 
                            user: { ...user, attachmentStyle: quizResults.attachmentStyle } 
                        })}
                    >
                        <Text style={styles.homeButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.moreInfoButton}
                        onPress={() => navigation.navigate('AttachmentInfo', {
                            user: user, 
                            quizResults: quizResults
                        })}
                    >
                        <Text style={styles.moreInfoButtonText}>Learn About Your Attachment Style</Text>
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
    resultLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    resultValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D3557',
        textTransform: 'capitalize',
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
    moreInfoButton: {
        backgroundColor: '#1D3557',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    moreInfoButtonText: {
        color: '#FFF',
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