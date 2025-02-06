import {InternalAxiosRequestConfig} from 'axios';

import {AuthTokensStorageController} from '../AuthTokensStorageController';

export function onRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = AuthTokensStorageController.validatedAccessToken;

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
}
