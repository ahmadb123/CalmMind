
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
            if (results && results.attachmentStyle) {
                setQuizResults(results);
            } else {
                setError(true);
            }
        } catch (err) {
            console.error('Error loading quiz results:', err);
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

    if (error || !quizResults || !quizResults.attachmentStyle) {
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
                <Text style={styles.title}>
                    {quizResults.attachmentStyle.replace('_', ' ')} Attachment Style
                </Text>
                
                <View style={styles.descriptionCard}>
                    <Text style={styles.descriptionText}>
                        {quizResults.description}
                    </Text>
                </View>

                <View style={styles.scoresContainer}>
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Anxiety Score</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.anxietyScore?.toFixed(2) || 'N/A'}
                        </Text>
                    </View>
                    
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Avoidance Score</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.avoidanceScore?.toFixed(2) || 'N/A'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <AppFooter />
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
        gap: 15,
    },
    scoreCard: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
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
        marginBottom: 5,
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#457B9D',
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
    