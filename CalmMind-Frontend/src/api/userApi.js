import config from '../constants/config';
const API_URL = config.API_URL;

export async function registerUser(userData){
    try{
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body is an object of user data (RegisterRequest type in java(backend))
            body: JSON.stringify(userData),
        });
        if(!response.ok){
            // return the getMessage() from the response 
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register user'); 
        }
        const data = await response.json();
        return data
    }
    catch(error){
        throw new Error(error.message || 'Failed to register user'
        )
    }
};

export async function getUserProfile(userId){
    try{
        const response = await fetch(`${API_URL}/api/users/${userId}`, { // api/users/{id}
            method : 'GET',
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
            throw new Error(errorData.message || 'Failed to fetch user profile');
        }
            }
    catch(error){
        throw new Error(error.message || 'Failed to fetch user profile');
    }
};

export async function userLogin({username, password}){
    try{
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        if(response.ok){
            return await response.json();
        }
        else{
            const error = await response.json();
            throw new Error (error.message || 'Login failed');
        }
    }catch(error){
        throw new Error(error.message || 'Login failed');
    }
};