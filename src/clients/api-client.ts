import { expect, type APIRequestContext } from '@playwright/test';
import { environmentConfig } from '../config/environment.config';

export class ApiClient {
  constructor(private request: APIRequestContext, private token?: string) {}

  async get(endpoint: string, params: Record<string, string> = {}) {
    const response = await this.request.get(`${environmentConfig.baseURL}${endpoint}`, {
      params,
      headers: this.buildHeaders(),
    });
    expect(response.status()).toBe(200);
    return response.json();
  }

  async post(endpoint: string, data: Record<string, unknown> = {}) {
    const response = await this.request.post(`${environmentConfig.baseURL}${endpoint}`, {
      data,
      headers: this.buildHeaders(),
    });
    expect(response.status()).toBe(200);
    return response.json();
  }

  private buildHeaders() {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (this.token) {
      headers.Cookie = `token=${this.token}`;
    }
    return headers;
  }
}