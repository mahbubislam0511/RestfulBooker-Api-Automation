
import {
  type APIRequestContext,
  type APIResponse,
} from '@playwright/test';

import { environmentConfig } from '../config/environment.config';

export class ApiClient {
  private token?: string;

  constructor(private readonly request: APIRequestContext) {}

  setToken(token: string): void {
    this.token = token;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (this.token) {
      headers.Cookie = `token=${this.token}`;
    }

    return headers;
  }

  private buildUrl(endpoint: string): string {
    const baseURL = environmentConfig.baseURL.replace(/\/+$/, '');
    const path = endpoint.replace(/^\/+/, '');

    return `${baseURL}/${path}`;
  }

  async get(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<APIResponse> {
    return this.request.get(this.buildUrl(endpoint), {
      params,
      headers: this.buildHeaders(),
    });
  }

  async post(
    endpoint: string,
    data: unknown = {},
  ): Promise<APIResponse> {
    return this.request.post(this.buildUrl(endpoint), {
      data,
      headers: this.buildHeaders(),
    });
  }

  async put(
    endpoint: string,
    data: unknown,
  ): Promise<APIResponse> {
    return this.request.put(this.buildUrl(endpoint), {
      data,
      headers: this.buildHeaders(),
    });
  }

  async patch(
    endpoint: string,
    data: unknown,
  ): Promise<APIResponse> {
    return this.request.patch(this.buildUrl(endpoint), {
      data,
      headers: this.buildHeaders(),
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(this.buildUrl(endpoint), {
      headers: this.buildHeaders(),
    });
  }
}