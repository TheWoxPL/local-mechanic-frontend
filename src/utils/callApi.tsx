import { AuthService } from 'src/services/authService';
import { CallApiResponseDTO } from 'src/shared/dtos/call-api-reponse.dto';

export async function callApi<T>(
  path: string,
  method: string,
  body?: object
): Promise<CallApiResponseDTO<T>> {
  const baseURL: string = import.meta.env.VITE_APP_API_BASE_URL;
  const allowedMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'];
  const token = (await AuthService.getToken()) || '';

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
  const contentType = response.headers.get('Content-Type');
  const data = contentType.includes('application/json')
    ? response.json()
    : response.text();
  return new CallApiResponseDTO<T>({
    statusCode: response.status,
    path: path,
    message: response.statusText,
    data: await data,
  });
}
