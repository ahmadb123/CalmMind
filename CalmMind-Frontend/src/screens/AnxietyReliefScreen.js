import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppFooter from '../components/AppFooter';
import { getToolsForUser, getToolsByFeatureType, getAllToolCategories, getAllToolFeatureTypes } from '../api/AnxietyReliefFeatureApi';

function AnxietyReliefScreen({ route, navigation }) {
    const { user } = route.params;
    
    if (!user) {
        navigation.navigate('Login');
        return null;
    }

    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    useEffect(() => {
        loadAnxietyReliefTools();
    }, []); // ✅ Fixed syntax - closing bracket and comma

    const loadAnxietyReliefTools = async () => {
        setLoading(true);
        try {
            const fetchedTools = await getToolsForUser(user?.id);
            setTools(fetchedTools);
        } catch (err) {
            console.error('Error fetching anxiety relief tools:', err);
            setError(true);
            Alert.alert('Error', 'Failed to load anxiety relief tools');
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        setLoading(true);
        try{
            const categories = await getAllToolCategories();
            setCategories(categories);
        }catch(err){
            console.error('Error fetching tool categories:', err);
            setError(true);
            Alert.alert('Error', 'Failed to load tool categories');
        }finally{
            setLoading(false);
        }
    };

    const loadFeatures = async () => {
        setLoading(true);
        try{
            const features = await getAllToolFeatureTypes();
            setFeatures(features);
        }catch(err){
            console.error('Error fetching tool features:', err);
            setError(true);
            Alert.alert('Error', 'Failed to load tool features');
        }finally{
            setLoading(false);
        }
    };

    const addIconToFeature = (features) => {
        return features.map((feature) => {
            switch (feature.toUpperCase()) {
                case 'BREATHING': return '🫁';
                case 'MEDITATION': return '🧘';
                case 'PROGRESSIVE_MUSCLE_RELAXATION': return '💪';
                case 'GROUNDING': return '🌍';
                case 'JOURNALING': return '✍️';
                case 'AFFIRMATIONS': return '💬';
                default: return '🛠️';
            }   
        });
    };

    if(loading){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#457B9D" />
                    <Text style={styles.loadingText}>Loading Tools ...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if(error){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>Failed to load anxiety relief tools.</Text>
                    <TouchableOpacity 
                        style={styles.retryButton}
                        onPress={loadAnxietyReliefTools}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

   // check if user has specific tool assigned
   // const oddNumbers = numbers.filter(number => number % 2 !== 0);
    const onlyGeneralTools = tools.filter(tool => tool.category === 'GENERAL');
    const userSpecificTools = tools.filter(tool => tool.category !== 'GENERAL');
    const userHasAttachmentStyle = user?.attachmentStyle || null;

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Anxiety Relief Tools</Text>
                </View>
                {/* Personalized Section (if user has attachment style) */}
                {userHasAttachmentStyle && (
                    <View style={styles.personalizedSection}>
                        <Text style={styles.sectionTitle}>
                            ✨ For Your {user.attachmentStyle?.replace('_', ' ')} Attachment Style
                        </Text>
                        <Text style={styles.sectionSubtitle}>
                            Specially designed for you!
                        </Text>
                        {userSpecificTools.map((tool) => (
                            <TouchableOpacity
                                key={tool.id}
                                style={styles.toolCard}
                                onPress={() => navigation.navigate('ToolDetail', { tool, user })}
                            >
                                <Text style={styles.toolTitle}>{tool.featureName}</Text>  
                                <Text style={styles.toolDescription}>{tool.description}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                {/* if user doesnt have attachment prompt take quiz option: */}
                {!userHasAttachmentStyle && (
                    <TouchableOpacity
                        style={styles.quizPrompt}
                        onPress={() => navigation.navigate('Quiz', { user })}
                    >
                        <Text style={styles.quizIcon}>💭</Text>
                        <Text style={styles.quizTitle}>
                            Get Personalized Anxiety Strategies
                        </Text>
                        <Text style={styles.quizSubtitle}>
                            Take the attachment style quiz
                        </Text>
                        <View style={styles.quizButton}>
                            <Text style={styles.quizButtonText}>Take Quiz →</Text>
                        </View>
                    </TouchableOpacity>         
                )}
                {/* General tools section */}
                <View style={styles.generalSection}>
                    <Text style={styles.sectionTitle}>🛠️ General Anxiety Relief Tools</Text>
                    <Text style={styles.sectionSubtitle}>
                        Tools for everyone to explore
                    </Text>
                    {onlyGeneralTools.map((tool) => (
                        <TouchableOpacity
                            key={tool.id}
                            style={styles.toolCard}
                            onPress={() => navigation.navigate('ToolDetail', { tool, user })}
                        >
                            <Text style={styles.toolTitle}>{tool.featureName}</Text>
                            <Text style={styles.toolDescription}>{tool.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>          
            </ScrollView>
            <AppFooter navigation={navigation} user={user} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1FAEE',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 80,
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
        color: '#457B9D',
    },
    errorText: {
        fontSize: 18,
        color: '#E63946',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    retryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        marginBottom: 20,
    },
    backButton: {
        fontSize: 16,
        color: '#457B9D',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D3557',
    },
    personalizedSection: {
        marginBottom: 30,
    },
    generalSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    quizPrompt: {
        backgroundColor: '#E8D5E8',
        borderRadius: 15,
        padding: 25,
        marginBottom: 30,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#D8BFD8',
    },
    quizIcon: {
        fontSize: 48,
        marginBottom: 10,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    quizSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        textAlign: 'center',
    },
    quizButton: {
        backgroundColor: '#A8DADC',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    quizButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
    },
    toolCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    toolTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1D3557',
        marginBottom: 4,
    },
    toolDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default AnxietyReliefScreen;