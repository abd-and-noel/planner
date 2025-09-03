import axios from "axios";

const address = process.env.REACT_APP_ADDRESS

export const refreshAccessToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
        throw new Error('No refresh token found');
    }

    try{
        const response = await axios.post(`${address}/api/token/refresh/`, {
            refresh: refresh,
        });
        localStorage.setItem('access', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error(`Refresh failed:`, error);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return null;
    }
}