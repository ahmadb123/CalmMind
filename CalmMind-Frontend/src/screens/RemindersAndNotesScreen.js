import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createReminderOrNote, fetchRemindersAndNotesByUserId, updateReminderSettings , deleteReminderOrNoteById} from '../api/RemindersAndNotesApi';
import ReminderSettingsModal from '../components/ReminderSettingsModal';
import NotificationService from '../service/NotificationService';

function RemindersAndNotesScreen({route, navigation}) {

    const {user} = route.params;
    if(!user){
        Alert.alert('Error', 'User not found. Please login again.');
        navigation.navigate('Login');
    } 
    
    const userId = user.id;

    const [thoughts, setThoughts] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remindersAndNotes, setRemindersAndNotes] = useState([]);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [selectedReminder, setSelectedReminder] = useState(null);

    useEffect(() => {
        fetchRemindersAndNotes();
    }, []);

    const fetchRemindersAndNotes = async () => {
        setLoading(true);
        setError(null);
        try{
            const data = await fetchRemindersAndNotesByUserId(userId);
            setRemindersAndNotes(data); 
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleCreateNote = async () => {
        if (!thoughts.trim()) {
            Alert.alert('Error', 'Please enter your thoughts');
            return;
        }

        setLoading(true);
        setError(null);
        try{
            const newNote = await createReminderOrNote({userId, thoughts});
            setThoughts('');
            
            // Ask if they want to set a reminder
            Alert.alert(
                'Note Saved!',
                'Would you like to set a reminder for this note?',
                [
                    {
                        text: 'No, thanks',
                        onPress: () => fetchRemindersAndNotes(),
                        style: 'cancel'
                    },
                    {
                        text: 'Set Reminder',
                        onPress: () => {
                            setSelectedReminder(newNote);
                            setShowReminderModal(true);
                        }
                    }
                ]
            );
        }catch(err){
            setError(err.message);
            Alert.alert('Error', err.message);
        }finally{
            setLoading(false);
        }
    };

    const handleSaveReminder = async (settings) => {
        try {
            const updated = await updateReminderSettings(selectedReminder.id, settings);
            try{
                await NotificationService.scheduleReminders(updated, user.username);
                Alert.alert('Success', 'Reminder scheduled successfully!');
            }catch(notifError){
                console.error('Error scheduling notifications:', notifError);
                Alert.alert('Partial Success', 'Reminder saved but failed to schedule notifications.');
            }
            setShowReminderModal(false);
            setSelectedReminder(null);
            fetchRemindersAndNotes();
        } catch (err) {
            Alert.alert('Error', err.message);
        }
    };

    const handleSetReminderForExisting = (item) => {
        setSelectedReminder(item);
        setShowReminderModal(true);
    };

    const handleDeleteNote = async (item) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note and its reminders?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Cancel notifications first
                            if (item.reminderTimes?.length > 0) {
                                await NotificationService.cancelRemindersForNote(item.id);
                            }
                            
                            // Delete from backend
                            await deleteReminderOrNoteById(item.id);
                            
                            Alert.alert('Success', 'Note deleted');
                            fetchRemindersAndNotes();
                        } catch (err) {
                            Alert.alert('Error', err.message);
                        }
                    }
                }
            ]
        );
    };

    if(loading && remindersAndNotes.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#457B9D" />
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Notes & Reminders 📝</Text>
            {/* back button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            
            {/* Create Note Section */}
            <View style={styles.createSection}>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    placeholderTextColor="#999"
                    value={thoughts}
                    onChangeText={setThoughts}
                    multiline
                    numberOfLines={4}
                />
                <TouchableOpacity 
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleCreateNote}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Saving...' : '💾 Save Note'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* List of Notes */}
            {remindersAndNotes.length > 0 ? (
                <FlatList
                    data={remindersAndNotes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.itemContent}>
                                <Text style={styles.itemText}>{item.thoughts}</Text>
                                <Text style={styles.itemDate}>
                                    {new Date(item.createdAt).toLocaleDateString()} at{' '}
                                    {new Date(item.createdAt).toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </Text>
                                
                                {/* Show reminder status */}
                                {item.reminderTimes && item.reminderTimes.length > 0 ? (
                                    <View style={styles.reminderBadge}>
                                        <Text style={styles.reminderBadgeText}>
                                            🔔 {item.setOptions} • {item.reminderTimes.length} {item.reminderTimes.length === 1 ? 'time' : 'times'}
                                        </Text>
                                        <View style={styles.timesContainer}>
                                            {item.reminderTimes.map((timeObj, idx) => (
                                                <Text key={idx} style={styles.timeChip}>
                                                    {new Date(`2000-01-01T${timeObj.time}`).toLocaleTimeString([], { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.setReminderButton}
                                        onPress={() => handleSetReminderForExisting(item)}
                                    >
                                        <Text style={styles.setReminderText}>
                                            ⏰ Set Reminder
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={[styles.setReminderButton, {marginTop: 10, borderColor: '#E53935'}]}
                                    onPress={() => handleDeleteNote(item)}
                                >
                                    <Text style={[styles.setReminderText, {color: '#E53935'}]}>
                                        🗑️ Delete Note
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>📝</Text>
                    <Text style={styles.emptyText}>No notes yet</Text>
                    <Text style={styles.emptySubtext}>
                        Start by writing down your thoughts above
                    </Text>
                </View>
            )}

            {/* Reminder Settings Modal */}
            <ReminderSettingsModal
                visible={showReminderModal}
                onClose={() => {
                    setShowReminderModal(false);
                    setSelectedReminder(null);
                    fetchRemindersAndNotes();
                }}
                onSave={handleSaveReminder}
                reminder={selectedReminder}
            />
        </SafeAreaView>         
    );
}

export default RemindersAndNotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1FAEE',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        color: '#1D3557',
        paddingHorizontal: 20,
    },
    createSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    input: {
        minHeight: 100,
        borderColor: '#A8DADC',
        borderWidth: 2,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#457B9D',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A8DADC',
        opacity: 0.6,
    },
    buttonText: {
        color: '#F1FAEE',
        fontSize: 16,
        fontWeight: '600',  
    },
    errorText: {
        color: '#E63946',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemContent: {
        padding: 15,
    },
    itemText: {
        fontSize: 16,
        color: '#1D3557',
        lineHeight: 22,
        marginBottom: 10,
    },
    itemDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    reminderBadge: {
        backgroundColor: '#E8F5E9',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    reminderBadgeText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    setReminderButton: {
        backgroundColor: '#FFF3E0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#FF9800',
    },
    setReminderText: {
        fontSize: 14,
        color: '#E65100',
        fontWeight: '600',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#457B9D',
        textAlign: 'center',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1D3557',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 8,
    },
    timeChip: {
        backgroundColor: '#C8E6C9',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        fontSize: 11,
        color: '#1B5E20',
        fontWeight: '600',
    },
});