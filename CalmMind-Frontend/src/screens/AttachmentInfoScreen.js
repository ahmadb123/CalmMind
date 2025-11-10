import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
function AttachmentInfoScreen({route, navigation}){
    const { user, quizResults } = route.params;
    if(!quizResults || !quizResults.attachmentStyle) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>
                        No attachment style information available.
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
                        {quizResults.description}  {/* ✅ Description is here! */}
                    </Text>
                </View>

                <View style={styles.scoresContainer}>
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Anxiety Score</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.anxietyScore?.toFixed(2)}
                        </Text>
                    </View>
                    
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreLabel}>Avoidance Score</Text>
                        <Text style={styles.scoreValue}>
                            {quizResults.avoidanceScore?.toFixed(2)}
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
    },
});

export default AttachmentInfoScreen;

    