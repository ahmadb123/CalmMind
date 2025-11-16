import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications should be handled when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

class NotificationService {
    
    // Request notification permissions
    async requestPermission() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        
        if (finalStatus !== 'granted') {
            throw new Error('Permission not granted for notifications');
        }
        
        return true;
    }

    // Create channel is handled automatically by Expo
    async createChannel() {
        // Expo handles this automatically, no-op for compatibility
        return true;
    }

    // Schedule reminders based on user settings
    async scheduleReminders(reminder, username) {
        await this.requestPermission();
        
        // Cancel existing notifications for this reminder
        await this.cancelRemindersForNote(reminder.id);

        // Schedule each time
        const scheduledIds = [];
        for (const timeObj of reminder.reminderTimes) {
            const id = await this.scheduleReminderTime(reminder, timeObj.time, username);
            scheduledIds.push(id);
        }
        
        return scheduledIds;
    }

    // Schedule a single reminder time
    async scheduleReminderTime(reminder, timeString, username) {
        // Parse time (format: "09:00:00")
        const [hours, minutes] = timeString.split(':').map(Number);
        
        // Create trigger time
        const now = new Date();
        const triggerDate = new Date();
        triggerDate.setHours(hours, minutes, 0, 0);
        
        // If time has passed today, schedule for tomorrow
        if (triggerDate <= now) {
            triggerDate.setDate(triggerDate.getDate() + 1);
        }

        // Determine repeat settings based on setOptions
        let trigger;

        if (reminder.setOptions === 'EVERYDAY') {
            // Repeat daily
            trigger = {
                hour: hours,
                minute: minutes,
                repeats: true,
            };
        } else if (reminder.setOptions === 'WEEKDAYS') {
            // For weekdays, we need to schedule separately for each day
            // This is a simplified version - you can enhance it
            trigger = {
                hour: hours,
                minute: minutes,
                repeats: true,
            };
        } else if (reminder.setOptions === 'WEEKENDS') {
            // For weekends, schedule for Saturday and Sunday
            trigger = {
                hour: hours,
                minute: minutes,
                repeats: true,
            };
        } else {
            // One-time notification
            trigger = {
                date: triggerDate,
            };
        }

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: '🧘 CalmMind Reminder',
                body: `Hey ${username}, a reminder for you: ${reminder.thoughts || 'Time for your scheduled reminder!'}`,
                data: { reminderId: reminder.id, time: timeString },
                sound: true,
            },
            trigger,
        });

        console.log('Scheduled notification:', notificationId);
        return notificationId;
    }

    // Cancel all reminders for a specific note
    async cancelRemindersForNote(reminderId) {
        const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
        
        for (const notification of allNotifications) {
            if (notification.content.data?.reminderId === reminderId) {
                await Notifications.cancelScheduledNotificationAsync(notification.identifier);
            }
        }
    }

    // Cancel all reminders
    async cancelAllNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    // Get all scheduled notifications (for debugging)
    async getScheduledNotifications() {
        return await Notifications.getAllScheduledNotificationsAsync();
    }

    // Test immediate notification
    async testNotification() {
        await this.requestPermission();
        
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '🧘 Test Notification',
                body: 'If you see this, notifications are working!',
                sound: true,
            },
            trigger: null, // Show immediately
        });
    }
}

export default new NotificationService();