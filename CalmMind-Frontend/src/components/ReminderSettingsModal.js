import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

function ReminderSettingsModal({ visible, onClose, onSave, reminder }) {
    const [setOptions, setSetOptions] = useState('EVERYDAY');
    const [reminderTimes, setReminderTimes] = useState([new Date()]);
    const [showTimePicker , setShowTimePicker] = useState(null);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatTimeForBackend = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}:00`;
    };

    const addReminderTime = () => {
        if(reminderTimes.length >= 10){
            Alert.alert('Limit Reached', 'You can add up to 10 reminder times only.');
            return;
        }
        setReminderTimes([...reminderTimes, new Date()]);
    }

    const removeReminderTime = (index) => {
        if(reminderTimes.length === 1){
            Alert.alert('At least one time required', 'You must have at least one reminder time.');
            return;
        }
        const newTimes = reminderTimes.filter((_, i) => i !== index);
        setReminderTimes(newTimes);
    };

    const updateTime = (index, newTime) => {
        const newTimes = [...reminderTimes];
        newTimes[index] = newTime;
        setReminderTimes(newTimes);
    };


    const handleSave = () => {
        const settings = {
            setOptions, 
            reminderTimes: reminderTimes.map(date => formatTimeForBackend(date)),
        };
        onSave(settings);
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
                            {['EVERYDAY', 'WEEKDAYS', 'WEEKENDS'].map((option) => (
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

                        {/* Time Pickers */}
                        <View style={styles.timesHeader}>
                            <Text style={styles.sectionTitle}>Reminder Times</Text>
                            <TouchableOpacity 
                                style={styles.addButton}
                                onPress={addReminderTime}
                            >
                                <Text style={styles.addButtonText}>+ Add Time</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {reminderTimes.map((time, index) => (
                            <View key={index} style={styles.timeRow}>
                                <TouchableOpacity
                                    style={styles.timePickerButton}
                                    onPress={() => setShowTimePicker(index)}
                                >
                                    <Text style={styles.timeLabel}>Time {index + 1}:</Text>
                                    <Text style={styles.timeValue}>{formatTime(time)}</Text>
                                </TouchableOpacity>
                                
                                {reminderTimes.length > 1 && (
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => removeReminderTime(index)}
                                    >
                                        <Text style={styles.removeButtonText}>✕</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        {showTimePicker !== null && (
                            <DateTimePicker
                                value={reminderTimes[showTimePicker]}
                                mode="time"
                                is24Hour={false}
                                display="default"
                                onChange={(event, selectedTime) => {
                                    setShowTimePicker(Platform.OS === 'ios' ? showTimePicker : null);
                                    if (selectedTime) {
                                        updateTime(showTimePicker, selectedTime);
                                    }
                                }}
                            />
                        )}

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
                                <Text style={styles.saveButtonText}>
                                    Save ({reminderTimes.length} {reminderTimes.length === 1 ? 'time' : 'times'})
                                </Text>
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
        minWidth: '30%',
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
    timesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
    },
    timePickerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F1FAEE',
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A8DADC',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D3557',
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#457B9D',
    },
    removeButton: {
        backgroundColor: '#E63946',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
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