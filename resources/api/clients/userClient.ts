import { APIRequestContext, expect } from '@playwright/test';
import { logRequest, logResponse } from '@utils/apiUtils';

export class UserClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_URL!;
  }

  /* ----------- POST ENDPOINTS ----------- */

  async postLogin(credentials: Record<string, any>) {
    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }

  async postRegister(userData: Record<string, any>) {
    const url = `${this.baseUrl}/users/register`;
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await this.request.post(url, {
      data: userData,
      headers
    });

    logRequest('POST', url, headers, userData);
    await logResponse(response);
    return response;
  }

  /* ----------- GET ENDPOINTS ----------- */

  async getUsers(token) {
    const url = `${this.baseUrl}/users`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

  async getUserById(token, userId: string) {
    const url = `${this.baseUrl}/users/${userId}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

  async getCurrentUser(token) {
    const url = `${this.baseUrl}/users/me`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

  /* ----------- DELETE ENDPOINTS ----------- */

  async deleteUser(token, userId: string) {
    const url = `${this.baseUrl}/users/${userId}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await this.request.delete(url, { headers });

    logRequest('DELETE', url, headers);
    await logResponse(response);
    return response;
  }

  /* ----------- PUT ENDPOINTS ----------- */

  async putUser(token, userData: Record<string, any>, userId: string) {
    const url = `${this.baseUrl}/users/${userId}`;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await this.request.put(url, {
      data: userData,
      headers
    });

    logRequest('PUT', url, headers, userData);
    await logResponse(response);
    return response;
  }
}