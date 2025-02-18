export interface User {
  id: number; // string
  login: string;
  name: string;
  role: string;
}

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
