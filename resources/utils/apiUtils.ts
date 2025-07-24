
import { APIResponse } from '@playwright/test';
import registerUserTemplate from '@requestsTemplates/post-register-request.json';
import { UserDataBuilder } from '@dataBuilders/userDataBuilder';
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv({ allErrors: true });

export function validateSchema(responseData: any, schema: any): void {
  const validate = ajv.compile(schema);
  const valid = validate(responseData);
  if (!valid) {
    console.error("❌ Schema validation failed:", validate.errors);
    throw new Error("Schema validation failed");
  }
  console.log("✅ Schema validation passed");
}

export function fillRequestTemplate(template: any, data: Record<string, any>) {
  const templateString = JSON.stringify(template);
  const filledString = templateString.replace(/{{(.*?)}}/g, (_, key) => {
    const value = data[key];
    return value !== undefined ? value : '';
  });
  return JSON.parse(filledString);
}

export function logRequest(method: string, url: string, headers?: Record<string, string>, body?: any) {
  console.log(`\nRQUEST → ${method.toUpperCase()} ${url}`);

  if (headers?.Authorization) {
    console.log(`Token: ${headers.Authorization}`);
  }

  if (body) {
    console.log('Request Body:', JSON.stringify(body, null, 2));
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
  console.log('**** Registering user ****');
  const userData = await UserDataBuilder.validRequestBody();
  const requestData = fillRequestTemplate(registerUserTemplate, userData);

  const response = await userClient.postRegister(requestData);
  if (response.status() !== 201) {
    throw new Error(`Failed to create user. Status: ${response.status()}`);
  }

  const body = await response.json();
  return { userData: userData, createdUser: body };
}