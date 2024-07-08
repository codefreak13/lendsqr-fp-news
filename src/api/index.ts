import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ApiErrorLogger, ErrorLogger} from '../utils/logger.utils';

export const API_URL = 'https://rickandmortyapi.com/api';

// create instance of api
const Api = Axios.create({baseURL: API_URL});

Api.interceptors.request.use(
  async config => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      ...config.headers,
    };
    if (config.headers.authorization === 'N/A') {
      delete config.headers.authorization;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

Api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    let message = error.message;
    try {
      ApiErrorLogger(error);
      if (/network error/i.test(message)) {
        const netinfo = await NetInfo.fetch();
        const isConnected = !!(
          netinfo.isConnected && netinfo.isInternetReachable
        );
        message = isConnected
          ? 'Whoops, something went wrong, please try again in a moment.'
          : "No internet connection, please ensure you're connected to the internet and try again.";
      }
    } catch (e) {
      ErrorLogger(e as Error);
    } finally {
      return Promise.reject({...error, message});
    }
  },
);

export type IAPIResult<D = any> = {
  message: string;
  data?: D | undefined;
  code: number;
  responseCode?: string;
  servertime?: string;
  message_Id?: string;
};

// export Api as module
export default Api;
