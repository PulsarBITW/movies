import {debug} from 'patronum';
import {createDomain, fork} from 'effector';
import {createGate} from 'effector-react';
import {NavigateFunction, SetURLSearchParams} from 'react-router-dom';

export type NavigationGateProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  navigate: NavigateFunction;
};

export const appScope = fork();

export const rootDomain = createDomain('rootDomain');
export const RootGate = createGate('RootGate');

export const NavigationGate = createGate<NavigationGateProps>('NavigationGate');

export const appStarted = rootDomain.createEvent('appStarted');
export const globalReset = rootDomain.createEvent('globalReset');

if (process.env.NODE_ENV === 'development') {
  debug.registerScope(appScope, {name: 'appScope'});
}

export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light',
}

export enum ScreenTypeEnum {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

/**@description Contains the max-width in pixels for different screen types. */
export const breakPoints = {
  mobile: 768,
  tablet: 1024,
} as const;

export enum LocalStorageKeys {
  App_access_token = 'app_auth_access_token',
  App_refresh_token = 'app_auth_refresh_token',

  App_latest_views = 'app_latest_views',
  App_last_page = 'app_last_page',
  App_theme = 'app_theme',

  App_storage_version = 'app_storage_version',
}

export type AuthKeys = LocalStorageKeys.App_access_token | LocalStorageKeys.App_refresh_token;
