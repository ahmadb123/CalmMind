import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator 
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

export default function AudioPlayer({ source, title = "Guided Audio" }) {
    const player = useAudioPlayer(source);
    const status = useAudioPlayerStatus(player);
    
    const [isSeeking, setIsSeeking] = useState(false);

    // Format time (seconds → mm:ss)
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Get current position in seconds
    const currentPosition = status.currentTime || 0;
    const totalDuration = status.duration || 0;
    const isPlaying = status.playing || false;
    const isLoaded = status.isLoaded || false;

    // Calculate remaining time
    const remainingTime = totalDuration - currentPosition;

    // Handle play/pause
    const handlePlayPause = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    // Handle skip
    const handleSkip = (seconds) => {
        const newPosition = Math.max(0, Math.min(totalDuration, currentPosition + seconds));
        player.seekTo(newPosition);
    };

    // Handle slider change
    const handleSliderChange = (value) => {
        setIsSeeking(true);
        player.seekTo(value);
    };

    const handleSlidingComplete = (value) => {
        setIsSeeking(false);
        player.seekTo(value);
    };

    if (!isLoaded && !status.error) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#457B9D" />
                <Text style={styles.loadingText}>Loading audio...</Text>
            </View>
        );
    }

    if (status.error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>❌ Failed to load audio</Text>
                <Text style={styles.errorSubtext}>Please check the audio URL</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Title & Remaining Time */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {/* ✅ SINGLE badge for remaining time */}
                <View style={styles.remainingBadge}>
                    <Text style={styles.remainingTime}>{formatTime(remainingTime)}</Text>
                    <Text style={styles.remainingLabel}>remaining</Text>
                </View>
            </View>

            {/* Controls Row */}
            <View style={styles.controlsRow}>
                {/* Backward 10s */}
                <TouchableOpacity 
                    style={[styles.skipButton, currentPosition <= 0 && styles.disabledButton]}
                    onPress={() => handleSkip(-10)}
                    disabled={currentPosition <= 0}
                >
                    <Text style={styles.skipIcon}>⏪</Text>
                    <Text style={styles.skipText}>10s</Text>
                </TouchableOpacity>

                {/* Play/Pause */}
                <TouchableOpacity 
                    style={[styles.playButton, isPlaying && styles.pauseButton]}
                    onPress={handlePlayPause}
                >
                    <Text style={styles.playIcon}>
                        {isPlaying ? '⏸️' : '▶️'}
                    </Text>
                    <Text style={styles.playText}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </Text>
                </TouchableOpacity>

                {/* Forward 10s */}
                <TouchableOpacity 
                    style={[
                        styles.skipButton, 
                        currentPosition >= totalDuration && styles.disabledButton
                    ]}
                    onPress={() => handleSkip(10)}
                    disabled={currentPosition >= totalDuration}
                >
                    <Text style={styles.skipIcon}>⏩</Text>
                    <Text style={styles.skipText}>10s</Text>
                </TouchableOpacity>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={totalDuration}
                    value={isSeeking ? undefined : currentPosition}
                    minimumTrackTintColor="#1D3557"
                    maximumTrackTintColor="#D1D1D1"
                    thumbTintColor="#1D3557"
                    onValueChange={handleSliderChange}
                    onSlidingComplete={handleSlidingComplete}
                />
            </View>

            {/* Time Labels */}
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
                <Text style={styles.timeText}>{formatTime(totalDuration)}</Text>
            </View>

            {/* Status Indicator */}
            {isPlaying && (
                <View style={styles.statusIndicator}>
                    <View style={styles.playingDot} />
                    <Text style={styles.statusText}>Playing...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    // ✅ NEW: Header with title and remaining time
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1D3557',
        textAlign: 'center',
        marginBottom: 12,
    },
    // ✅ UPDATED: Single centered badge
    remainingBadge: {
        backgroundColor: '#FFF3E0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#FFA726',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    remainingTime: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1D3557',
    },
    remainingLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#E63946',
        textAlign: 'center',
        fontWeight: '600',
    },
    errorSubtext: {
        fontSize: 13,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    skipButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#1D3557',
    },
    disabledButton: {
        opacity: 0.3,
        borderColor: '#CCC',
    },
    skipIcon: {
        fontSize: 24,
        marginBottom: 2,
    },
    skipText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#1D3557',
    },
    playButton: {
        backgroundColor: '#457B9D',
        paddingVertical: 16,
        paddingHorizontal: 28,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    pauseButton: {
        backgroundColor: '#E63946',
    },
    playIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    playText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    progressContainer: {
        marginBottom: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    timeText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    playingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 8,
    },
    statusText: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
    },
});