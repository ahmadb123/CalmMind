import config from '../constants/config';
const API_URL = config.API_URL;


export async function fetchPartnerStyleQuizQuestions(){
    try{
        const response = await fetch(`${API_URL}/api/partner-style-quiz/quiz`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching partner style quiz questions:', error);
        throw error;
    }
};

export async function submitPartnerStyleQuiz(userId, answers){
    try{
        const response = await fetch(`${API_URL}/api/partner-style-quiz/submit/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting partner style quiz:', error);
        throw error;
    }
};


export async function getPartnerStyleQuizResults(userId){
    try{
        const response = await fetch(`${API_URL}/api/partner-style-quiz/results/${userId}`);
        if(response.status === 204){
            // no results yet return null 
            return null;
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching partner style quiz results:', error);
        throw error;
    }
};