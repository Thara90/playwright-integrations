import { APIRequestContext, expect } from '@playwright/test';
import { logRequest, logResponse } from '@utils/apiUtils';
import { log } from 'console';

export class BrandClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_URL!;
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

}