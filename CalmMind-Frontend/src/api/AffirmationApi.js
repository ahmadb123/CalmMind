import config from '../constants/config';
const API_URL = config.API_URL;

export async function fetchRandomAffirmation(){
    try{
        const response = await fetch(`${API_URL}/api/affirmations/random`, {
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
            throw new Error(errorData.message || 'Failed to fetch affirmation');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch affirmation');
    }
};