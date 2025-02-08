import {AxiosError} from 'axios';
import {allSettled} from 'effector';

import {appScope, rootDomain} from '@shared/config';
import {baseRefreshTokens} from '../../auth';
import {AuthTokensStorageController} from '../AuthTokensStorageController';
import {apiClient} from '../apiClient';

export async function onResponseErrorInterceptor(error: AxiosError) {
  try {
    if (error.response?.status === 401) return await handleAuthenticationError(error);
    return Promise.reject(error);
  } catch {
    return Promise.reject(error);
  }
}

let CURRENT_UPDATE_TOKENS_IN_PROGRESS: Promise<void> | null = null;

export const invalidToken = rootDomain.createEvent('invalidToken');

export async function handleAuthenticationError(error: AxiosError) {
  if (error.config?.url === '/api/refresh-tokens') return Promise.reject(error);

  if (!CURRENT_UPDATE_TOKENS_IN_PROGRESS) {
    const refreshToken = AuthTokensStorageController.validatedRefreshToken;

    if (!refreshToken) {
      handleInvalidToken();
      throw new Error('Need to authenticate');
    }

    CURRENT_UPDATE_TOKENS_IN_PROGRESS = updateTokens(refreshToken);
  }

  try {
    await CURRENT_UPDATE_TOKENS_IN_PROGRESS;

    if (error.config) {
      error.config.headers['Authorization'] =
        `Bearer ${AuthTokensStorageController.validatedAccessToken}`;
      return apiClient(error.config);
    }

    return Promise.reject(error);
  } catch (refreshError) {
    handleInvalidToken();
    return Promise.reject(refreshError);
  }
}

function handleInvalidToken() {
  allSettled(invalidToken, {scope: appScope});
}

async function updateTokens(refreshToken: string) {
  try {
    const authTokensData = await baseRefreshTokens(refreshToken);
    AuthTokensStorageController.setAuthTokens({
      refreshToken: authTokensData.refreshToken,
      accessToken: authTokensData.accessToken,
    });
  } finally {
    CURRENT_UPDATE_TOKENS_IN_PROGRESS = null;
  }
}
