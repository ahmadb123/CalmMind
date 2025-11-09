import config from '../constants/config';
const API_URL = config.API_URL;

export async function fetchQuiz(){
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