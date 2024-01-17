import axios, { AxiosError, AxiosRequestConfig, AxiosStatic, isAxiosError } from "axios";
import { ErrorResponseService } from "../responses";
const endpoint = import.meta.env.VITE_ENDPOINT_API;

interface CI_AxiosRequestConfig extends AxiosRequestConfig {
  headers?: Record<string, string>;
  isPublic?: boolean;
  isBlob?: boolean;
}

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if ((response.code = "ERR_BAD_RESPONSE")) {
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("alex", { response });
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("error aqui", error);
    console.error(error);
    // return Promise.reject(error);
  },
);

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

export const httpAdapterService = new HttpAdapterService(endpoint);
