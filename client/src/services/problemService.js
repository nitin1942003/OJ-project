import axios from 'axios';

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/problems`;
const RUN_URL = `${import.meta.env.VITE_BACKEND_URL}/run`;
const JUDGE_URL = `${import.meta.env.VITE_BACKEND_URL}/judge`;
const SAVE_CODE_URL = `${import.meta.env.VITE_BACKEND_URL}/save`;

// Fetch all problems
export const getProblems = async () => {
    try {
        const response = await axios.get(BASE_URL, axios_options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching problems:', error);
        throw error;
    }
};

//Fetch solved problems
export const getSolvedProblems = async ()=>{
    try {
        const response=await axios.get(`${BASE_URL}/solved-problems`, axios_options);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching solved problems:', error);
        throw error;
    }
}

// Fetch a given problem
export const getProblem = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`, axios_options);
        return response.data;
    } catch (error) {
        console.error(`Error fetching problem with id ${id}:`, error);
        throw error;
    }
};

// Create a new problem
export const createProblem = async ({ title, description, testCases }) => {
    try {
        const payload = {
            title,
            description,
            testCases,
        };
        const response = await axios.post(BASE_URL, payload, axios_options);
        return response.data;
    } catch (error) {
        console.error('Error creating problem:', error);
        throw error;
    }
};

// Update an existing problem
export const updateProblem = async (id, updatedProblem) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedProblem, axios_options);
        return response.data;
    } catch (error) {
        console.error(`Error updating problem with id ${id}:`, error);
        throw error;
    }
};

// Delete a problem
export const deleteProblem = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`, axios_options);
        return response.data;
    } catch (error) {
        console.error(`Error deleting problem with id ${id}:`, error);
        throw error;
    }
};

// Fetch problems created by the user
export const getUserProblems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user-problems`, axios_options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user problems:', error);
        throw error;
    }
};

// Run the problem code
export const run = async (formData) => {
    try {
        const response = await axios.post(RUN_URL, formData, axios_options);
        console.log('Run response:', response);
        return response.data;
    } catch (error) {
        console.error('Error running code:', error);
        throw error;
    }
};

// Save the code 
export const save = async (formData) => {
    try {
        const response = await axios.post(SAVE_CODE_URL, formData, axios_options);
        console.log('Save code response:', response);
        return response.data;
    } catch (error) {
        console.error('Error saving code:', error);
        throw error;
    }
};

// Judge the problem code
export const judge = async (formData) => {
    try {
        const response = await axios.post(JUDGE_URL, formData, axios_options);
        console.log('Judge response:', response);
        return response.data;
    } catch (error) {
        console.error('Error judging code:', error);
        throw error;
    }
};
