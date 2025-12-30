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