import {jwtDecode} from 'jwt-decode';

export function isAuthenticated() {
    const token = localStorage.getItem('access');
    if (!token) {
        return false;
    }

    try{
        const { exp } = jwtDecode(token);
        return exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
}