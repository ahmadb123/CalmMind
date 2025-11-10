import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AppFooter({ showBackButton = true, customContent = null }) {
    const navigation = useNavigation();
    
    if (customContent) {
        return (
            <View style={styles.footer}>
                {customContent}
            </View>
        );
    }
    
    return (
        <View style={styles.footer}>
            {showBackButton && (
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            )}
            
            <TouchableOpacity 
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.homeButtonText}>🏠 Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1D3557',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#457B9D',
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    homeButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    homeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AppFooter;