import { APIRequestContext, expect } from '@playwright/test';
import { logRequest, logResponse } from '@utils/apiUtils';
import { log } from 'console';

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
    logRequest('POST', `${this.baseUrl}/users/login`, credentials);
    await logResponse(response);
    return response;
  }

  async postRegister(userData: Record<string, any>) {
    const response = await this.request.post(`${this.baseUrl}/users/register`, {
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logRequest('POST', `${this.baseUrl}/users/register`, userData);
    await logResponse(response);
    return response;
  }

  /* ----------- GET ENDPOINTS ----------- */

  async getUsers(token) {
    const response = await this.request.get(`${this.baseUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    logRequest('GET', `${this.baseUrl}/users`, {});
    await logResponse(response);
    return response;
  }

  async getUserById(token, userId: string) {
    const response = await this.request.get(`${this.baseUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    logRequest('GET', `${this.baseUrl}/users/${userId}`, {});
    await logResponse(response);
    return response;
  }

  async getCurrentUser(token) {
    const response = await this.request.get(`${this.baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    logRequest('GET', `${this.baseUrl}/users/me`, {});
    await logResponse(response);
    return response;
  }

  /* ----------- DELETE ENDPOINTS ----------- */

  async deleteUser(token, userId: string) {
    const response = await this.request.delete(`${this.baseUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    logRequest('DELETE', `${this.baseUrl}/users/${userId}`, {});
    await logResponse(response);
    return response;
  }

  /* ----------- PUT ENDPOINTS ----------- */

  async putUser(token, userData: Record<string, any>, userId: string) {
    const response = await this.request.put(`${this.baseUrl}/users/${userId}`, {
      data: userData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    logRequest('PUT', `${this.baseUrl}/users/${userId}`, {});
    await logResponse(response);
    return response;
  }
}