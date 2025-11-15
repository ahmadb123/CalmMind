import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

function ReminderSettingsModal({ visible, onClose, onSave, reminder }) {
    const [setOptions, setSetOptions] = useState('EVERYDAY');
    const [whenOptions, setWhenOptions] = useState('MORNING');
    const [frequentOptions, setFrequentOptions] = useState('ONCE');
    const [timingOptions, setTimingOptions] = useState('FLEXIBLE_TIME');

    const handleSave = () => {
        onSave({
            setOptions,
            whenOptions,
            frequentAndTimingOptions: frequentOptions,
            timing: timingOptions,
        });
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalTitle}>Set Reminder ⏰</Text>
                        
                        {/* Display the thought */}
                        <View style={styles.thoughtContainer}>
                            <Text style={styles.thoughtLabel}>Your Note:</Text>
                            <Text style={styles.thoughtText}>{reminder?.thoughts}</Text>
                        </View>

                        {/* When to remind */}
                        <Text style={styles.sectionTitle}>When to remind?</Text>
                        <View style={styles.optionsGrid}>
                            {['EVERYDAY', 'WEEKDAYS', 'WEEKENDS', 'CUSTOM'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        setOptions === option && styles.optionButtonSelected,
                                    ]}
                                    onPress={() => setSetOptions(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            setOptions === option && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option.replace('_', ' ')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Time of day */}
                        <Text style={styles.sectionTitle}>What time of day?</Text>
                        <View style={styles.optionsGrid}>
                            {['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        whenOptions === option && styles.optionButtonSelected,
                                    ]}
                                    onPress={() => setWhenOptions(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            whenOptions === option && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Frequency */}
                        <Text style={styles.sectionTitle}>How many times?</Text>
                        <View style={styles.optionsGrid}>
                            {['ONCE', 'TWICE', 'THRICE'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        frequentOptions === option && styles.optionButtonSelected,
                                    ]}
                                    onPress={() => setFrequentOptions(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            frequentOptions === option && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Timing preference */}
                        <Text style={styles.sectionTitle}>Timing preference</Text>
                        <View style={styles.optionsGrid}>
                            {['SPECIFIC_TIME', 'FLEXIBLE_TIME'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        timingOptions === option && styles.optionButtonSelected,
                                    ]}
                                    onPress={() => setTimingOptions(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            timingOptions === option && styles.optionTextSelected,
                                        ]}
                                    >
                                        {option.replace('_', ' ')}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Action buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>Save Reminder</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

export default ReminderSettingsModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,
        width: '90%',
        maxHeight: '85%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D3557',
        marginBottom: 20,
        textAlign: 'center',
    },
    thoughtContainer: {
        backgroundColor: '#F1FAEE',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#457B9D',
    },
    thoughtLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        fontWeight: '600',
    },
    thoughtText: {
        fontSize: 16,
        color: '#1D3557',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
        marginTop: 15,
        marginBottom: 10,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 15,
    },
    optionButton: {
        backgroundColor: '#F1FAEE',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A8DADC',
        minWidth: '45%',
        alignItems: 'center',
    },
    optionButtonSelected: {
        backgroundColor: '#457B9D',
        borderColor: '#457B9D',
    },
    optionText: {
        fontSize: 14,
        color: '#1D3557',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    optionTextSelected: {
        color: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 25,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#E63946',
    },
    saveButton: {
        backgroundColor: '#457B9D',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});