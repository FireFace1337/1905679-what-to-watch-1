
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { getUser } from './user';
import { toastifyOptions } from '../const';

const BASE_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const user = getUser();

    if (user) {
      config.headers['X-Token'] = user.token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        toast.warn(error.response.data.error, toastifyOptions);
      }

      throw error;
    }
  );

  return api;
};
