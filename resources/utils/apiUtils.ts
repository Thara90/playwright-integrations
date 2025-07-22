
import { APIResponse } from '@playwright/test';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';

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

export async function createUser(userClient: any) {
  const userData = await UserDataBuilder.validRequestBody();
  const requestData = fillRequestTemplate(registerUserTemplate, userData);

  const response = await userClient.postRegister(requestData);
  if (response.status() !== 201) {
    throw new Error(`Failed to create user. Status: ${response.status()}`);
  }

  const body = await response.json();
  return { userData: userData, createdUser: body };
}