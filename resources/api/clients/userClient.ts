import { APIRequestContext, expect } from '@playwright/test';
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
    return response;
  }

  async postRegister(userData: Record<string, any>) {
    const response = await this.request.post(`${this.baseUrl}/users/register`, {
      data: userData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
    console.log(`${this.baseUrl}/users`);
    return response;
  }

  async getCurrentUser(token) {
    const response = await this.request.get(`${this.baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`${this.baseUrl}/users/me`);
    return response;
  }
}