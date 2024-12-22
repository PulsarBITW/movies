import {AxiosRequestConfig} from 'axios';

import type {Movie} from './types';
import {apiClient} from '../apiClient';

export const baseFetchMovies = async (axiosConfig?: AxiosRequestConfig): Promise<Movie[]> => {
  return (await apiClient.get<Movie[]>('/api/movies', axiosConfig)).data;
};
