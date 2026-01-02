import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
import { getUserStyleQuizResults } from '../api/UserStyleQuizApi';

function MyStyleScreen({route, navigation}){
    const { user } = route.params || {};
    const [quizResults, setQuizResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (user?.id) {
            loadQuizResults();
        } else {
            setError(true);
            setLoading(false);
        }
    }, []);

    const loadQuizResults = async () => {
        try {
            const results = await getUserStyleQuizResults(user.id);
            
            // ✅ Check for "style" instead of "dominantOption"
            if (!results || !results.style) {
                navigation.replace('QuizScreen', { user });
                return;
            }
            
            setQuizResults(results);
        } catch (err) {
            console.error('Error loading quiz results:', err);
            navigation.replace('QuizScreen', { user });
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

    if (error || !quizResults) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>
                        Unable to load your results.
                    </Text>
                    <TouchableOpacity
                        style={styles.takeQuizButton}
                        onPress={() => navigation.navigate('QuizScreen', { user })}
                    >
                        <Text style={styles.takeQuizButtonText}>Take Quiz</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Map column letters to attachment style names
    const getStyleName = (option) => {
        switch(option) {
            case 'A': return 'Anxious';
            case 'B': return 'Secure';
            case 'C': return 'Avoidant';
            default: return 'Unknown';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Title - use "style" instead of "dominantOption" */}
                <Text style={styles.title}>
                    {getStyleName(quizResults.style)} Attachment Style
                </Text>
                
                {/* Primary Style Description */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>About Your Style</Text>
                </View>
                
                <View style={styles.descriptionCard}>
                    {/* Use "scoringKeyDesc" instead of "interpretation" */}
                    <Text style={styles.descriptionText}>
                        {quizResults.scoringKeyDesc || 'No description available.'}
                    </Text>
                </View>

                {/* Score Breakdown */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Scores</Text>
                </View>

                <View style={styles.scoresContainer}>
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Anxious (A)</Text>
                        {/* Use "groupScores" instead of "columnScores" */}
                        <Text style={styles.scoreValue}>
                            {quizResults.groupScores?.A || 0}
                        </Text>
                        
                        <View style={styles.scoreBarBackground}>
                            <View 
                                style={[
                                    styles.scoreBarFill,
                                    { 
                                        width: `${((quizResults.groupScores?.A || 0) / 42) * 100}%`,
                                        backgroundColor: '#FF6B6B'
                                    }
                                ]} 
                            />
                        </View>
                    </View>
                    
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Secure (B)</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.groupScores?.B || 0}
                        </Text>
                        
                        <View style={styles.scoreBarBackground}>
                            <View 
                                style={[
                                    styles.scoreBarFill,
                                    { 
                                        width: `${((quizResults.groupScores?.B || 0) / 42) * 100}%`,
                                        backgroundColor: '#4CAF50'
                                    }
                                ]} 
                            />
                        </View>
                    </View>

                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Avoidant (C)</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.groupScores?.C || 0}
                        </Text>
                        
                        <View style={styles.scoreBarBackground}>
                            <View 
                                style={[
                                    styles.scoreBarFill,
                                    { 
                                        width: `${((quizResults.groupScores?.C || 0) / 42) * 100}%`,
                                        backgroundColor: '#42A5F5'
                                    }
                                ]} 
                            />
                        </View>
                    </View>
                </View>

                {/* Retake Button */}
                <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={() => navigation.navigate('QuizScreen', { user })}
                >
                    <Text style={styles.retakeButtonText}>🔄 Retake Quiz</Text>
                </TouchableOpacity>

                {/* Spacer for footer */}
                <View style={{ height: 100 }} />
            </ScrollView>
            <AppFooter navigation={navigation} />
        </SafeAreaView>
    );
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
        textAlign: 'center',
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
    descriptionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    scoresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    scoreCard: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scoreLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
        textAlign: 'center',
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 10,
    },
    scoreBarBackground: {
        width: '100%',
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    scoreBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    retakeButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    retakeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    takeQuizButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
    },
    takeQuizButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default MyStyleScreen;