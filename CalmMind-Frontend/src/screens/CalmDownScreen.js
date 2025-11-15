import React, {useState} from 'react';
import { sendChatRequestToOpenAI } from '../api/OpenAiApi';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator, 
    TextInput,
    ScrollView 
} from 'react-native';

function CalmDownScreen() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    const handleOpenAIResponse = async () => {
        if (!message.trim()) {
            setError('Please enter a message.');
            return;
        }

        setLoading(true);
        setError(null);
        setResponse(''); // Clear previous response

        try {
            const data = await sendChatRequestToOpenAI(message);
            setResponse(data.choices[0]?.message?.content || "No response.");
            setMessage(''); // Clear input after success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to format the response text into structured sections
    const formatResponse = (text) => {
        if (!text) return null;

        // Split by lines and process
        const lines = text.split('\n');
        const elements = [];
        let key = 0;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (!trimmedLine) {
                // Empty line - add spacing
                elements.push(<View key={`space-${key++}`} style={styles.spacer} />);
            } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                // Bullet point
                const bulletText = trimmedLine.substring(1).trim();
                elements.push(
                    <View key={`bullet-${key++}`} style={styles.bulletContainer}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{bulletText}</Text>
                    </View>
                );
            } else if (trimmedLine.match(/^\d+\./)) {
                // Numbered list
                elements.push(
                    <Text key={`number-${key++}`} style={styles.numberedText}>
                        {trimmedLine}
                    </Text>
                );
            } else if (trimmedLine.length < 60 && !trimmedLine.endsWith('.') && !trimmedLine.endsWith('?')) {
                // Short line without punctuation - probably a heading
                elements.push(
                    <Text key={`heading-${key++}`} style={styles.headingText}>
                        {trimmedLine}
                    </Text>
                );
            } else {
                // Regular paragraph
                elements.push(
                    <Text key={`para-${key++}`} style={styles.paragraphText}>
                        {trimmedLine}
                    </Text>
                );
            }
        });

        return elements;
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Here, we promise you the best methods to calm down.</Text>
            <Text style={styles.optionsToCalmDown}>
                Whether you feel like talking to someone, listening to audio, meditating, 
                breathing, grounding, or receiving support — we've got you.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Hello I'm not feeling the best today."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
            />

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleOpenAIResponse}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Loading..." : "Get Calm Down Advice"}
                </Text>
            </TouchableOpacity>

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4caf50" />
                    <Text style={styles.loadingText}>Getting personalized advice...</Text>
                </View>
            )}

            {response && !loading && (
                <View style={styles.responseContainer}>
                    {formatResponse(response)}
                </View>
            )}

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
        color: '#1a1a1a',
    },
    optionsToCalmDown: {
        fontSize: 16,
        marginBottom: 25,
        textAlign: 'center',
        color: '#555',
        lineHeight: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#fff',
        marginBottom: 20,
        fontSize: 16,
        minHeight: 90,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonDisabled: {
        backgroundColor: '#a5d6a7',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#4caf50',
        fontWeight: '500',
    },
    responseContainer: {
        marginTop: 10,
        padding: 20,
        backgroundColor: '#e8f5e9',
        borderRadius: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#4caf50',
    },
    spacer: {
        height: 12,
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginTop: 10,
        marginBottom: 8,
    },
    paragraphText: {
        fontSize: 16,
        color: '#1b5e20',
        lineHeight: 24,
        marginBottom: 10,
    },
    bulletContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        paddingLeft: 10,
    },
    bullet: {
        fontSize: 20,
        color: '#4caf50',
        marginRight: 10,
        fontWeight: 'bold',
    },
    bulletText: {
        flex: 1,
        fontSize: 16,
        color: '#1b5e20',
        lineHeight: 24,
    },
    numberedText: {
        fontSize: 16,
        color: '#1b5e20',
        lineHeight: 24,
        marginBottom: 8,
        paddingLeft: 10,
    },
    errorContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffebee',
        borderRadius: 12,
        borderLeftWidth: 5,
        borderLeftColor: '#c62828',
    },
    errorText: {
        fontSize: 16,
        color: '#c62828',
        lineHeight: 22,
    },
});

export default CalmDownScreen;