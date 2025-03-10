import { getToken } from 'src/services/authService';

export async function callApi<T>(
  path: string,
  method: string,
  body?: object
): Promise<T> {
  const baseURL: string = import.meta.env.VITE_APP_API_BASE_URL;
  const allowedMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'];
  const token = (await getToken()) || '';

  if (!allowedMethods.includes(method.toUpperCase())) {
    throw new Error(`Method ${method} is not allowed.`);
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(baseURL + path, options);
  return response.json();
}
