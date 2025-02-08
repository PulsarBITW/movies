import {AuthTokensData, Credentials, LoginResponseDto} from './types';
import {apiClient} from '../apiClient';

export const baseRefreshTokens = async (refreshToken: string): Promise<AuthTokensData> => {
  return (await apiClient.post<AuthTokensData>('/api/refresh-tokens', {refreshToken})).data;
};

export const baseAuthentication = async (credentials: Credentials): Promise<LoginResponseDto> => {
  return (await apiClient.post('/api/login', credentials)).data;
};
