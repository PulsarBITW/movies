import {ThemeEnum} from './theme';

export enum LocalStorageKeys {
  App_access_token = 'app_auth_access_token',
  App_refresh_token = 'app_auth_refresh_token',

  App_latest_views = 'app_latest_views',
  App_last_page = 'app_last_page',
  App_theme = 'app_theme',

  App_storage_version = 'app_storage_version',
}

type AppLatestView = {
  id: string;
  genre: string;
  progress: string;
};

/**@description Data types after deserialization */
export type AppLatestViews = AppLatestView[];
export type AppLastPage = string;
export type AppTheme = ThemeEnum;

export type LocalStorageValuesUnion = AppLatestViews | AppLastPage | AppTheme;

export type AuthKeys = LocalStorageKeys.App_access_token | LocalStorageKeys.App_refresh_token;
