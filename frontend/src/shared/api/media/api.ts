import {AxiosRequestConfig} from 'axios';

import {MediaItem} from './types';
import {apiClient} from '../apiClient';

export const baseFetchMediaList = async (
  axiosConfig?: AxiosRequestConfig,
): Promise<MediaItem[]> => {
  return (await apiClient.get<MediaItem[]>('/api/media', axiosConfig)).data;
};
