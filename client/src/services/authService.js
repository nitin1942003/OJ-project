import axios from 'axios'

const REGISTER_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/register`
const LOGIN_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
const LOGOUT_URL = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`

const axios_options = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }

export const register = async (formData) => {
    const response = await axios.post(REGISTER_URL, JSON.stringify(formData), axios_options)
    return response.data
}

export const login = async (formData) => {
    const response = await axios.post(LOGIN_URL, JSON.stringify(formData), axios_options)
    console.log(response)
    return response.data
}

export const logout = async () => {
    await axios.post(LOGOUT_URL, {}, { withCredentials: true })
}