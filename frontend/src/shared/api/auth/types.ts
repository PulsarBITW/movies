import {User} from '@shared/types/currentUser';

export type AuthTokensData = {
  refreshToken: string;
  accessToken: string;
};

export type LoginResponseDto = {
  user: User;
} & AuthTokensData;

export type Credentials = {
  login: string;
  password: string;
};

export type LoginByGoogleCredentials = {
  googleToken: string;
};
