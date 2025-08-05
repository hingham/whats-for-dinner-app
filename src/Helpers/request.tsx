import { auth } from '../firebase';

const API_DOMAIN = process.env.NEXT_PUBLIC_WHATS_FOR_DINNER_API;

if (!API_DOMAIN) {
  throw new Error('NEXT_PUBLIC_WHATS_FOR_DINNER_API is not defined in the environment variables.');
}

/**
 * Mock function to get the Bearer token.
 * Replace this with your actual authentication logic.
 */
const getAuthToken = async (): Promise<string> => {
  // Example: Replace with Firebase Auth or your auth provider logic.
  const requestToken = await auth.currentUser?.getIdToken(true) || '';

  const user = { token: requestToken }; // Replace with actual token retrieval logic.
  return user.token;
};

/**
 * Base function to send API requests.
 * @param endpoint - The API endpoint (relative to the domain).
 * @param method - HTTP method (GET, POST, PUT, DELETE).
 * @param body - Request body (for POST/PUT).
 * @returns Response data or throws an error.
 */
const apiRequest = async (endpoint: string, method: string, token?: string, body?: unknown) => {
  if (!token) {
    // eslint-disable-next-line no-param-reassign
    token = await getAuthToken();
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_DOMAIN}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status >= 400 || response.status < 200) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  // I think this is the issue here - need to check that response can be parsed
  return response.json();
};

/**
 * Helper function for GET requests.
 * @param endpoint - The API endpoint.
 * @returns Response data.
 */
const getRequest = (endpoint: string, token: string) => apiRequest(endpoint, 'GET', token);

/**
 * Helper function for POST requests.
 * @param endpoint - The API endpoint.
 * @param body - Request body.
 * @returns Response data.
 */
export const postRequest = (endpoint: string, token: string, body: unknown) => apiRequest(endpoint, 'POST', token, body);

/**
 * Helper function for PUT requests.
 * @param endpoint - The API endpoint.
 * @param body - Request body.
 * @returns Response data.
 */
export const putRequest = (endpoint: string, token: string, body: unknown) => apiRequest(endpoint, 'PUT', token, body);

/**
 * Helper function for DELETE requests.
 * @param endpoint - The API endpoint.
 * @returns Response data.
 */
export const deleteRequest = (endpoint: string, token: string) => apiRequest(endpoint, 'DELETE', token);

export { getRequest };
