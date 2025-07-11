import { APIRequestContext, expect } from '@playwright/test';
import { log } from 'console';

export class UserClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_URL!;
  }

  async getAllUsers() {
    const response = await this.request.get(`${this.baseUrl}/users`);
    console.log(`${this.baseUrl}/users`);
    return response;
  }

  async createLogin(credentials: {
    email: string;
    password: string;
  }) {
    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
}