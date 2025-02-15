import {AuthTokensData, Credentials, LoginResponseDto} from './types';
import {apiClient} from '../apiClient';

export const baseRefreshTokens = async (refreshToken: string): Promise<AuthTokensData> => {
  return (await apiClient.post<AuthTokensData>('/api/refresh-tokens', {refreshToken})).data;
};

export const baseAuthenticationByCredentials = async (
  credentials: Credentials,
): Promise<LoginResponseDto> => {
  return (await apiClient.post('/api/login/credentials', credentials)).data;
};

export const baseAuthenticationByToken = async (accessToken: string): Promise<LoginResponseDto> => {
  return (await apiClient.post('/api/login/token', {accessToken})).data;
};
