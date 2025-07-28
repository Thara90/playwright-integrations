import { APIRequestContext, expect } from '@playwright/test';
import { logRequest, logResponse } from '@utils/apiUtils';

export class BrandClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_URL!;
  }

  /* ----------- POST ENDPOINTS ----------- */

  async postBrands(brandData: Record<string, any>) {
    const url = `${this.baseUrl}/brands`;
    const headers = {
      'Content-Type': 'application/json'
    }

    const data = {
      name: brandData.name,
      slug: brandData.slug
    };

    const response = await this.request.post(url, {
      data,
      headers
    });

    logRequest('POST', url, headers, brandData);
    await logResponse(response);
    return response;
  }

  /* ----------- GET ENDPOINTS ----------- */

  async getBrands() {
    const url = `${this.baseUrl}/brands`;
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

  async getBrandById(brandId: string) {
    const url = `${this.baseUrl}/brands/${brandId}`;
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

  async getBrandBySearch(searchQuery: string) {
    const url = `${this.baseUrl}/brands/search?q=${searchQuery}`;
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await this.request.get(url, { headers });

    logRequest('GET', url, headers);
    await logResponse(response);
    return response;
  }

}