import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { injectable } from 'inversify';

export function parse<T>(data: unknown): T {
  if (data === undefined) {
    return undefined as unknown as T;
  }

  if (typeof data === 'string') {
    return JSON.parse(data);
  }

  return data as T;
}

@injectable()
export class ApiClient {
  private readonly _baseUrl = process.env.REACT_APP_API_BASE_URL;
  private readonly _config: AxiosRequestConfig = { withCredentials: true };

  constructor() {
    if (!this._baseUrl) {
      throw new Error('Missing REACT_APP_API_BASE_URL in env');
    }
  }

  private genUrl(path: string) {
    return `${this._baseUrl}${path}`;
  }

  async get<T, R = AxiosResponse<T>, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return axios.get(this.genUrl(url), config ?? this._config);
  }

  async delete<T, R = AxiosResponse<T>, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return axios.delete(this.genUrl(url), config ?? this._config);
  }

  async post<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return axios.post(this.genUrl(url), data, config ?? this._config);
  }

  async put<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return axios.put(this.genUrl(url), data, config ?? this._config);
  }

  async patch<T, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return axios.patch(this.genUrl(url), data, config ?? this._config);
  }
}
