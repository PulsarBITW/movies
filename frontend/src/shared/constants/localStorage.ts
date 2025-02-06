export enum LocalStorageKeys {
  App_access_token = 'app_auth_access_token',
  App_refresh_token = 'app_auth_refresh_token',

  App_latest_views = 'app_latest_views',
  App_last_page = 'app_last_page',
  App_theme = 'app_theme',

  App_storage_version = 'app_storage_version',
}

export type AuthKeys = LocalStorageKeys.App_access_token | LocalStorageKeys.App_refresh_token;
