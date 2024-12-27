import {z} from 'zod';

import {LocalStorageKeys, ThemeEnum} from '@shared/constants';
import {safeDeserializeJson} from '@shared/lib/utils';
import {AppTheme} from '@shared/types';

const themeValueSchema = z.nativeEnum(ThemeEnum);

const checkIsDarkThemePreferred = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const getInitialThemeValue = (defaultValue: AppTheme): ThemeEnum => {
  let themeValue: ThemeEnum;

  const rawValue = localStorage.getItem(LocalStorageKeys.App_theme);
  const preferredTheme = checkIsDarkThemePreferred() ? ThemeEnum.Dark : defaultValue;

  if (!rawValue) {
    themeValue = preferredTheme;
  } else {
    const deserializedValue = safeDeserializeJson(rawValue, preferredTheme);
    const validatedValue = themeValueSchema.safeParse(deserializedValue);
    themeValue = validatedValue.success ? validatedValue.data : preferredTheme;
  }

  return themeValue;
};

export const initTheme = (themeValue: ThemeEnum) => {
  localStorage.setItem(LocalStorageKeys.App_theme, JSON.stringify(themeValue));
  applyTheme(themeValue);
};

export const applyTheme = (theme: ThemeEnum) => {
  // todo, use attr instead class
  if (theme === ThemeEnum.Dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
};
