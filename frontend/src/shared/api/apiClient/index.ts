import axios, {CreateAxiosDefaults} from 'axios';

const BASE_URL = 'http://localhost:8080';

const API_CLIENT_CONFIG: CreateAxiosDefaults = {
  baseURL: BASE_URL,
};

export const apiClient = axios.create(API_CLIENT_CONFIG);
