import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const createApi = (config?: AxiosRequestConfig): AxiosInstance => {
  const api = axios.create({
    baseURL: "https://reqres.in/api/",
    ...config,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return api;
};

const api = createApi();

export { api };
