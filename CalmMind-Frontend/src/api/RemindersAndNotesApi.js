import config from '../constants/config';
const API_URL = config.API_URL;


export async function createReminderOrNote(reminderOrNote) {
    try{
        const response = await fetch(`${API_URL}/api/reminders-notes/create`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reminderOrNote),
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create reminder or note');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to create reminder or note');
    }
};

export async function fetchRemindersAndNotesByUserId(userId){
    try{
        const response = await fetch(`${API_URL}/api/reminders-notes/user/${userId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch reminders and notes');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch reminders and notes');
    }
};

export async function updateReminderSettings(id, settings) {
    try {
        const response = await fetch(`${API_URL}/api/reminders-notes/${id}/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });

        const data = await response.json();
        
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error || 'Failed to update reminder settings');
        }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};