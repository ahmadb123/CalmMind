import config from '../constants/config';
const API_URL = config.API_URL;

// Fetch all anxiety relief tools and the speicific tool used by the user
export async function getToolsForUser(userId){
    try{
        const response = await fetch(`${API_URL}/api/anxiety-tools/user/${userId}`, {
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
            throw new Error(errorData.message || 'Failed to fetch tools');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch tools');
    }
};


// ✅ NEW: Get specific tool by ID
export const getToolById = async (toolId) => {
    try {
        const response = await fetch(
            `${API_URL}/api/anxiety-tools/tool/${toolId}`
        );
        
        if (!response.ok) {
            throw new Error('Tool not found');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tool:', error);
        throw error;
    }
};

// GET all tools by feature type: breathing, meditation, etc.
export async function getToolsByFeatureType(featureType){
    try{
        const response = await fetch(`${API_URL}/api/anxiety-tools/feature-type/${featureType}`, {
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
            throw new Error(errorData.message || 'Failed to fetch tools by feature type');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch tools by feature type');
    }
};

// GET ALL CATEGORIES:
export async function getAllToolCategories(){
    try{
        const response = await fetch(`${API_URL}/api/anxiety-tools/AnxietyReliefAttachmentType`, {
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
            throw new Error(errorData.message || 'Failed to fetch tool categories');
        }
    }catch(error){
        throw new Error(error.message || 'Failed to fetch tool categories');
    }
};

// GET ALL FEATUEE TYPES:
export async function getAllToolFeatureTypes(){
    try{
        const response = await fetch(`${API_URL}/api/anxiety-tools/AnxietyReliefFeatures`, {
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
            throw new Error(errorData.message || 'Failed to fetch tool feature types');
        }
    }
    catch(error){
        throw new Error(error.message || 'Failed to fetch tool feature types');
    }
};