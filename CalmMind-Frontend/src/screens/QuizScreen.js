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
import { Ionicons } from '@expo/vector-icons';
import { fetchUserStyleQuiz, submitUserStyleQuiz, getUserStyleQuizResults } from '../api/UserStyleQuizApi';
import AppFooter from '../components/AppFooter';

const QUESTIONS_PER_PAGE = 10;

function UserStyleQuizScreen({ route, navigation }) {
    const { user } = route.params || {};
    
    if (!user) {
        Alert.alert('Error', 'User not found. Please log in again.');
        navigation.navigate('Login');
        return null;
    }

    const [quizQuestions, setQuizQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [quizLoading, setQuizLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    
    const [hasResults, setHasResults] = useState(false);
    const [quizResults, setQuizResults] = useState(null);
    const [showingQuiz, setShowingQuiz] = useState(true);

    useEffect(() => {
        checkQuizStatus();
    }, []);

    const checkQuizStatus = async () => {
        if (!user?.id) {
            Alert.alert('Error', 'User not found. Please log in again.');
            navigation.navigate('Login');
            return;
        }
        
        setQuizLoading(true);
        
        try {
            const results = await getUserStyleQuizResults(user.id);
            
            // ✅ FIX: Check for "style" not "dominantOption"
            if (results && results.style) {
                setHasResults(true);
                setQuizResults(results);
                setShowingQuiz(false);
            } else {
                await loadQuiz();
            }
        } catch (error) {
            await loadQuiz();
        } finally {
            setQuizLoading(false);
        }
    };

    const loadQuiz = async () => {
        try {
            const fetchedQuestions = await fetchUserStyleQuiz();
            setQuizQuestions(fetchedQuestions);
            
            // Initialize all answers to false
            const initialAnswers = {};
            fetchedQuestions.forEach(q => {
                initialAnswers[q.questionId] = false;
            });
            setAnswers(initialAnswers);
            
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
                    setCurrentPage(0);
                    await loadQuiz();
                },
            },
        ]);
    };

    const handleCheckboxToggle = (questionId) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(quizQuestions.length / QUESTIONS_PER_PAGE);
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSubmit = async () => {
        // Format answers for submission
        const submissions = quizQuestions.map(q => ({
            questionId: q.questionId,
            answerValue: answers[q.questionId] || false
        }));
        
        setSubmitting(true);
        
        try {
            await submitUserStyleQuiz(user.id, submissions);
            
            // Fetch the results
            const results = await getUserStyleQuizResults(user.id);
            
            console.log('Results after submit:', results); // Debug
            
            const styleMap = {
                'A': 'ANXIOUS',
                'B': 'SECURE',
                'C': 'AVOIDANT'
            };

            const updaterUser = {
                ...user, 
                attachmentStyle: styleMap[results.style] || results.style
            };
            setQuizResults(results);
            setShowingQuiz(false);
            setHasResults(true);
            navigation.setParams({user: updaterUser});
        } catch (error) {
            Alert.alert('Error', 'Failed to submit quiz. Please try again later.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    // Render checkbox for specific column
    const renderCheckboxForColumn = (question, column) => {
        if (question.answerOption !== column) {
            return <View style={styles.emptyCell} />;
        }

        const isChecked = answers[question.questionId];

        return (
            <TouchableOpacity
                style={styles.checkboxCell}
                onPress={() => handleCheckboxToggle(question.questionId)}
                disabled={submitting}
            >
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked && (
                        <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    if (quizLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#457B9D" />
                    <Text style={styles.loadingText}>Loading quiz...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // ✅ Results Display - MUST come before quiz display
    if (hasResults && !showingQuiz && quizResults) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Your Attachment Style</Text>
                    
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Your Style</Text>
                        {/* ✅ FIX: Use "style" not "dominantOption" */}
                        <Text style={styles.resultValue}>
                            {quizResults.style === 'A' ? 'Anxious' :
                             quizResults.style === 'B' ? 'Secure' :
                             quizResults.style === 'C' ? 'Avoidant' : 'Unknown'}
                        </Text>
                        
                        {/* ✅ FIX: Use "scoringKeyDesc" not "interpretation" */}
                        {quizResults.scoringKeyDesc && (
                            <Text style={styles.resultDescription}>
                                {quizResults.scoringKeyDesc}
                            </Text>
                        )}
                    </View>

                    <View style={styles.scoresCard}>
                        <Text style={styles.scoresTitle}>Score Breakdown</Text>
                        
                        {/* ✅ FIX: Use "groupScores" not "columnScores" */}
                        <View style={styles.scoreRow}>
                            <Text style={styles.scoreLabel}>Anxious (A)</Text>
                            <Text style={styles.scoreValue}>
                                {quizResults.groupScores?.A || 0}
                            </Text>
                        </View>
                        
                        <View style={styles.scoreRow}>
                            <Text style={styles.scoreLabel}>Secure (B)</Text>
                            <Text style={styles.scoreValue}>
                                {quizResults.groupScores?.B || 0}
                            </Text>
                        </View>
                        
                        <View style={styles.scoreRow}>
                            <Text style={styles.scoreLabel}>Avoidant (C)</Text>
                            <Text style={styles.scoreValue}>
                                {quizResults.groupScores?.C || 0}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={handleRetakeQuiz}
                    >
                        <Text style={styles.retakeButtonText}>🔄 Retake Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => navigation.navigate('Home', { user })}
                    >
                        <Text style={styles.homeButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                </ScrollView>
                <AppFooter navigation={navigation} />
            </SafeAreaView>
        );
    }

    // Quiz Display
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

    // Pagination calculations
    const totalPages = Math.ceil(quizQuestions.length / QUESTIONS_PER_PAGE);
    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, quizQuestions.length);
    const currentQuestions = quizQuestions.slice(startIndex, endIndex);
    
    const answeredCount = Object.values(answers).filter(a => a === true).length;
    const isLastPage = currentPage === totalPages - 1;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Attachment Style Quiz</Text>
                    <Text style={styles.subtitle}>
                        Check the box if the statement is TRUE for you.
                    </Text>
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        Page {currentPage + 1} of {totalPages}
                    </Text>
                    <Text style={styles.progressSubtext}>
                        {answeredCount} of {quizQuestions.length} answered
                    </Text>
                </View>

                {/* Instructions Card */}
                <View style={styles.instructionsCard}>
                    <Ionicons name="information-circle" size={18} color="#457B9D" />
                    <Text style={styles.instructionsText}>
                        Check the small box next to each statement that is TRUE for you. (If the answer is untrue, don't mark the item at all.)
                    </Text>
                </View>

                {/* Questions Table */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <View style={styles.numberCol}>
                            <Text style={styles.headerText}>#</Text>
                        </View>
                        <View style={styles.statementCol}>
                            <Text style={styles.headerText}>Statement</Text>
                        </View>
                        <View style={styles.checkCol}>
                            <Text style={styles.headerText}>A</Text>
                        </View>
                        <View style={styles.checkCol}>
                            <Text style={styles.headerText}>B</Text>
                        </View>
                        <View style={styles.checkCol}>
                            <Text style={styles.headerText}>C</Text>
                        </View>
                    </View>

                    {/* Question Rows */}
                    {currentQuestions.map((question, index) => {
                        const globalIndex = startIndex + index;
                        return (
                            <View key={question.questionId} style={styles.questionRow}>
                                <View style={styles.numberCol}>
                                    <Text style={styles.questionNumber}>{globalIndex + 1}</Text>
                                </View>
                                
                                <View style={styles.statementCol}>
                                    <Text style={styles.questionText}>{question.questionText}</Text>
                                </View>
                                
                                <View style={styles.checkCol}>
                                    {renderCheckboxForColumn(question, 'A')}
                                </View>
                                
                                <View style={styles.checkCol}>
                                    {renderCheckboxForColumn(question, 'B')}
                                </View>
                                
                                <View style={styles.checkCol}>
                                    {renderCheckboxForColumn(question, 'C')}
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Navigation Buttons */}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity
                        style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
                        onPress={handlePreviousPage}
                        disabled={currentPage === 0}
                    >
                        <Ionicons name="chevron-back" size={20} color="#FFF" />
                        <Text style={styles.navButtonText}>Previous</Text>
                    </TouchableOpacity>

                    {!isLastPage ? (
                        <TouchableOpacity
                            style={[styles.navButton, styles.navButtonPrimary]}
                            onPress={handleNextPage}
                        >
                            <Text style={styles.navButtonText}>Next</Text>
                            <Ionicons name="chevron-forward" size={20} color="#FFF" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.navButton, styles.submitNavButton, submitting && styles.navButtonDisabled]}
                            onPress={handleSubmit}
                            disabled={submitting}
                        >
                            <Text style={styles.navButtonText}>
                                {submitting ? 'Submitting...' : 'Submit Quiz'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <AppFooter navigation={navigation} />
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    header: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    progressContainer: {
        backgroundColor: '#E3F2FD',
        padding: 12,
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    progressText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
    },
    progressSubtext: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    instructionsCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF9E6',
        padding: 12,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#F4A261',
        alignItems: 'center',
    },
    instructionsText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
    },
    scrollView: {
        flex: 1,
        marginHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#457B9D',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'center',
    },
    numberCol: {
        width: 35,
        alignItems: 'center',
    },
    statementCol: {
        flex: 1,
        paddingHorizontal: 8,
    },
    checkCol: {
        width: 45,
        alignItems: 'center',
    },
    headerText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '600',
    },
    questionRow: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'center',
        minHeight: 70,
    },
    questionNumber: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    questionText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    checkboxCell: {
        padding: 4,
    },
    emptyCell: {
        width: 26,
        height: 26,
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#457B9D',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#457B9D',
        borderColor: '#457B9D',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navButton: {
        flexDirection: 'row',
        backgroundColor: '#A8DADC',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        gap: 8,
    },
    navButtonPrimary: {
        backgroundColor: '#457B9D',
    },
    submitNavButton: {
        backgroundColor: '#2E7D32',
    },
    navButtonDisabled: {
        backgroundColor: '#CCCCCC',
        opacity: 0.6,
    },
    navButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    // Results styles
    resultsContainer: {
        padding: 20,
        alignItems: 'center',
        paddingBottom: 100,
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
        padding: 25,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    resultLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    resultValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#457B9D',
        marginBottom: 15,
    },
    resultDescription: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
        textAlign: 'center',
    },
    scoresCard: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scoresTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1D3557',
        marginBottom: 15,
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    scoreLabel: {
        fontSize: 16,
        color: '#555',
    },
    scoreValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
    },
    retakeButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 10,
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
});

export default UserStyleQuizScreen;