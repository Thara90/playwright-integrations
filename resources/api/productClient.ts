import { APIRequestContext, expect } from '@playwright/test';
import { log } from 'console';

export class ProductClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_URL!;
  }

  async getAllProducts() {
    const response = await this.request.get(`${this.baseUrl}/products`);
    console.log(`${this.baseUrl}/products`);
    return response;
  }

  async getProductById(id: string) {
    const response = await this.request.get(`${this.baseUrl}/products/${id}`);
    console.log(`${this.baseUrl}/products/${id}`);
    return response;
  }
  // Optional: add other methods later like getProductById(id), searchProducts(query), etc.
}