
import { APIResponse } from '@playwright/test';

export function fillRequestTemplate(template: any, data: Record<string, any>) {
    const templateString = JSON.stringify(template);
    const filledString = templateString.replace(/{{(.*?)}}/g, (_, key) => {
        const value = data[key];
        return value !== undefined ? value : '';
    });
    return JSON.parse(filledString);
}

export function logRequest(method: string, url: string, body?: any) {
  console.log(`\nREQUEST → ${method.toUpperCase()} ${url}`);
  if (body) {
    console.log('🔸 Request Body:', JSON.stringify(body, null, 2));
  }
}

export async function logResponse(response: APIResponse) {
  const status = response.status();
  let body: any;

  try {
    body = await response.json();
  } catch {
    body = await response.text();
  }

  console.log(`\nRESPONSE ← Status: ${status}`);
  console.log('🔹 Response Body:', body);
}