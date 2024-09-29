import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

type APIMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export class ApiService {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  private BASE_URL = import.meta.env.API_URL;
  private BASE_URL2 = import.meta.env.API_URL2;

  private async request<T>(
    urlSuffix: string,
    method: APIMethods,
    config: AxiosRequestConfig<T> = {},
    headers?: AxiosRequestHeaders,
    data?: unknown
  ) {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.request<T>({
        method,
        data,
        baseURL: this.BASE_URL + urlSuffix,
        headers: {
          ...headers,
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
        ...config,
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  }

  async get<T>(
    urlSuffix: string,
    config?: AxiosRequestConfig<T>,
    headers?: AxiosRequestHeaders
  ) {
    return await this.request<T>(urlSuffix, "GET", config, headers);
  }

  async post<T>(
    urlSuffix: string,
    data?: unknown,
    config?: AxiosRequestConfig<T>,
    headers?: AxiosRequestHeaders
  ) {
    return await this.request<T>(urlSuffix, "POST", config, headers, data);
  }

  async delete<T>(
    urlSuffix: string,
    config?: AxiosRequestConfig<T>,
    headers?: AxiosRequestHeaders
  ) {
    return await this.request<T>(urlSuffix, "DELETE", config, headers);
  }

  async patch<T>(
    urlSuffix: string,
    data?: unknown,
    config?: AxiosRequestConfig<T>,
    headers?: AxiosRequestHeaders
  ) {
    return await this.request<T>(urlSuffix, "PATCH", config, headers, data);
  }

  async put<T>(
    urlSuffix: string,
    data?: unknown,
    config?: AxiosRequestConfig<T>,
    headers?: AxiosRequestHeaders
  ) {
    return await this.request<T>(urlSuffix, "PUT", config, headers, data);
  }
}

export const apiService = ApiService.getInstance()
