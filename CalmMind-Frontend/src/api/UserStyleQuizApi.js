import config from '../constants/config';
const API_URL = config.API_URL;

export async function fetchUserStyleQuiz(){
    try{
        const response = await fetch(`${API_URL}/api/quiz/takeQuiz`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch quiz');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch quiz');
    }
};

export async function submitUserStyleQuiz(userId, answers){
    try{ // submitQuiz/{userId}
        const response = await fetch(`${API_URL}/api/quiz/submitQuiz/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit quiz');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to submit quiz');
    }
};

export async function getUserStyleQuizResults(userId){
    try{
        const response = await fetch(`${API_URL}/api/quiz/result/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch quiz results');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch quiz results');
    }
};