import {User} from '@shared/types/currentUser';
import {AuthTokensData} from './types';
import {apiClient} from '../apiClient';

export const baseRefreshTokens = async (refreshToken: string): Promise<AuthTokensData> => {
  return (await apiClient.post<AuthTokensData>('/api/refresh-tokens', {refreshToken})).data;
};

export type Credentials = {
  login: string;
  password: string;
};

const VALID_ACCESS_TOKEN = 'access1';
const VALID_REFRESH_TOKEN = 'refresh1';

export const baseAuthentication = async (
  credentials: Credentials,
): Promise<{user: User} & AuthTokensData> => {
  console.info('credentials', credentials);

  return {
    user: {
      id: (Math.random() * 1000).toFixed() + 'dq-sx',
    },
    accessToken: VALID_ACCESS_TOKEN,
    refreshToken: VALID_REFRESH_TOKEN,
  };
};
