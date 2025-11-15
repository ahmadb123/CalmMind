import config from '../constants/config';
const API_URL = config.API_URL;


export async function sendChatRequestToOpenAI(userMessage){
    try{
        const response = await fetch(`${API_URL}/api/openai/chat`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: userMessage}),
        });
        if(response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send chat request to OpenAI');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to send chat request to OpenAI');
    }
};