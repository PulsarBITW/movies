import {ThemeEnum} from '@shared/constants';

type AppLatestView = {
  id: string;
  genre: string;
  progress: string;
};

/**@description Data types after deserialization */
export type AppLatestViews = AppLatestView[];
export type AppLastPage = string;
export type AppTheme = ThemeEnum;
export type AppAuth = unknown;
export type AppUser = unknown;
