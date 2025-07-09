export class APIClient {
  private static instance: APIClient;
  private baseURL: string;

  private constructor() {
    this.baseURL = process.env.API_URL || '';
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  public async get(request: any, endpoint: string, queryParams?: Record<string, any>, pathParams?: Record<string, string | number>) {
  if (pathParams) {
    //for (const [key, value] of Object.entries(pathParams)) {
      endpoint = endpoint.replace(/:\w+/, encodeURIComponent(String(pathParams)));
    //}
  }
    const query = new URLSearchParams(queryParams).toString();
    const url = `${this.baseURL}${endpoint}${query ? `?${query}` : ''}`;
    console.log(`GET Request URL: ${url}`);
    return await request.get(url);
  }

  // Optionally add post, put, delete, etc.
}