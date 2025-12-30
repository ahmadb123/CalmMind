import React, { use, useEffect, useState } from 'react';
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
import { fetchPartnerStyleQuizQuestions } from '../api/PartnerQuizApi';
import ProgressBar from '../components/ProgressBar';


function PartnerQuizScreen({navigation}){
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const labels = ['AVOIDANT', 'SECURE', 'ANXIOUS'];
    const scoringKey = {
        'Very Untrue of them' : 1,
        'Moderately true of them' : 2,
        'Very true of them' : 3
    };
    const scores = Object.keys(scoringKey).map(key => scoringKey[key]);
    useEffect(() => {
        loadQuiz();
    }, []);

    // load quiz:
    const loadQuiz = async () => {
        try{
            const data = await fetchPartnerStyleQuizQuestions();
            if(!data){
                setError(true);
            }else{
                setQuiz(data);
            }
        }catch(err){
            setError(true);
        }finally{
            setLoading(false);
        }
    };
    
    const handleNext = () => {
        if(currentIndex < quiz.length - 1){
            setCurrentIndex(i => i + 1);
        }
    };

    const handlePrevious = () => {
        if(currentIndex > 0){
            setCurrentIndex(i => i - 1);
        }
    };

    const handleAnswer = (value) =>{
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentIndex]: value,
        }));
    }

    if(loading){
        return(
            <SafeAreaView style={styles.center}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Loadin quiz...</Text>
                </View>
            </SafeAreaView>
        );
    }


    // adjust group labels.  if avoidant show group A.. 
    const adjustLabels = (group) => {
        switch(group){
            case 'AVOIDANT':
                return 'Group A';
            case 'SECURE':
                return 'Group B';
            case 'ANXIOUS':
                return 'Group C';
            default:
                return group;
        }
    }
    // filters:
    const currentGroupQuiz = quiz?.[currentIndex];
    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex === quiz.length - 1;
    const isLastQuestionPerGroupQuiz = currentGroupQuiz?.questionNum === 11;

    const showScore = () => {
        if(currentGroupQuiz?.questionNum >= 11){
            /* show the GROUP TOTAL SCORE */
            return (
                <Text style={styles.center}>
                    Group {adjustLabels(currentGroupQuiz.group)} Total Score: 
                </Text>
            );
        }
    }

    if(err || quiz.length === 0){
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.errorText}>
                    No quiz available at the moment.
                </Text>
            </SafeAreaView>
        );
    }
    return(
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ProgressBar 
                    currentGroupQuiz={currentIndex + 1}
                    totalQuestions={quiz.length}
                />
                <View style={styles.container}>
                    <SafeAreaView style={styles.container}>
                            {/* show group first */}
                            {currentGroupQuiz?.group && (
                                <View style={styles.groupContainer}>
                                    <Text style={styles.groupText}>
                                        {adjustLabels(currentGroupQuiz.group)}
                                    </Text>
                                </View>
                            )}  
                    </SafeAreaView>
                </View>
                <View style={styles.questionContainer}>
                    <ScrollView style={styles.scrollView}>
                        {currentGroupQuiz && (
                            <Text style={styles.questionText}>
                               {currentGroupQuiz.questionNum}. {currentGroupQuiz.questionText}
                            </Text>
                        )}
                        {currentGroupQuiz?.descriptions.map((desc, index)=> {
                            return(
                                <Text key={index} style={styles.questionDescription}>
                                    {desc}
                                </Text>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.scoreContainer}>
                    <ScrollView style={styles.scrollView}>
                        {/* only show score options: 1,2,3 */}
                        <View style={styles.scoreContainer}>
                        <Text style={styles.scoreTitle}>Score</Text>

                        <View style={styles.scoreButtons}>
                            {scores.map(score => (
                            <TouchableOpacity
                                key={score}
                                onPress={() => handleAnswer(score)}
                                style={[
                                styles.scoreButton,
                                answers[currentIndex] === score && styles.scoreButtonActive,
                                ]}
                                accessibilityRole="button"
                                accessibilityLabel={`Select score ${score}`}
                            >
                                <Text
                                style={[
                                    styles.scoreButtonText,
                                    answers[currentIndex] === score && styles.scoreButtonTextActive,
                                ]}
                                >
                                {score}
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        </View>
                    </ScrollView>
                </View>
                {isLastQuestionPerGroupQuiz &&  showScore() (
                )}
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
        padding: 20,
    },
    groupContainer: {
        marginBottom: 12,   
        alignItems: 'center',
    },

    groupText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1D3557',   // dark, visible
        textTransform: 'capitalize',
    },
    questionContainer: {
        marginBottom: 12,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
    },
});

export default PartnerQuizScreen;