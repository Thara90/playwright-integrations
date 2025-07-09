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

  async createProduct(productData: {
    name: string;
    description: string;
    stock: string;
    price: string;
    brand_id: string;
    category_id: string;
    product_image_id: string;
    is_location_offer: boolean;
    is_rental: boolean;
  }) {
    const response = await this.request.post(`${this.baseUrl}/products`, {
      data: productData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }
}