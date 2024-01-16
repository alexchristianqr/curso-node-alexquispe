import axios, { AxiosError, AxiosRequestConfig, AxiosStatic, isAxiosError } from "axios";
import { ErrorResponseService } from "../responses";

interface CI_AxiosRequestConfig extends AxiosRequestConfig {
  headers?: Record<string, string>;
  isPublic?: boolean;
  isBlob?: boolean;
}

class HttpAdapterService {
  private config: AxiosRequestConfig = {};

  constructor(baseUrl: string) {
    axios.defaults.baseURL = baseUrl;
  }

  throwError(error: AxiosError | any) {
    if (isAxiosError(error)) {
      return new ErrorResponseService().apiResponse({ error });
    } else {
      console.error(error);
    }
  }

  getHTTPClient(config?: CI_AxiosRequestConfig): AxiosStatic {
    if (config?.isPublic) this.removeHeaders();
    return axios;
  }

  removeHeaders() {
    axios.defaults.headers.common = {};
  }

  addHeaderAuthorization(access_token: string) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }

  async get(url: string, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).get(url, this.config);
    } catch (error) {
      return this.throwError(error);
    }
  }

  async post<T>(url: string, data?: T | Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      this.config = {
        responseType: config?.isBlob ? "blob" : "json",
        headers: {
          ...config?.headers,
        },
      };
      return this.getHTTPClient(config).post(url, data, this.config);
    } catch (error) {
      return this.throwError(error);
    }
  }

  async put<T>(url: string, data?: T | Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).put(url, data, this.config);
    } catch (error) {
      return this.throwError(error);
    }
  }

  async patch(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      return this.getHTTPClient(config).patch(url, data, this.config);
    } catch (error) {
      return this.throwError(error);
    }
  }

  async delete(url: string, data?: Record<string, unknown>, config?: CI_AxiosRequestConfig): Promise<any> {
    try {
      this.config = { data };
      return this.getHTTPClient(config).delete(url, this.config);
    } catch (error) {
      return this.throwError(error);
    }
  }
}

export const httpAdapterService = new HttpAdapterService("http://localhost:3000/api/v1");
