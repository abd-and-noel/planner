import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from './token';

// Sync version — for routing & rendering
export function isTokenValid() {
  const token = localStorage.getItem('access');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch (err) {
    return false;
  }
}

// Async version — for background auth checks
export async function isAuthenticatedAsync() {
  const token = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');

  if (!token || !refresh) return false;

  try {
    const { exp } = jwtDecode(token);
    const isExpired = exp * 1000 < Date.now();

    if (isExpired) {
      const newToken = await refreshAccessToken();
      return !!newToken;
    }

    return true;
  } catch (err) {
    return false;
  }
}
