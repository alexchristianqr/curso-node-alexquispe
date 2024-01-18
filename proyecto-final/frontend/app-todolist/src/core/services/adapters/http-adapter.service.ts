import axios, { AxiosError, AxiosRequestConfig, AxiosStatic, isAxiosError } from "axios";
import { ErrorResponseService } from "../responses";
import { router } from "../../routes";

// Interceptar solicitudes
axios.interceptors.response.use(
  (response) => {
    console.log("[axios.interceptors]", { response });
    return response;
  },
  async (error) => {
    console.error("[axios.interceptors]", { error });
    const { status } = error.response;
    if (status === 401) {
      await router.push({ name: "login" });
      return error.response;
    } else {
      return error.response;
    }
  },
);

const endpoint = import.meta.env.VITE_ENDPOINT_API;

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

export const httpAdapterService = new HttpAdapterService(endpoint);
