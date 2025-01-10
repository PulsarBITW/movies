import {z} from 'zod';
import {Domain, sample} from 'effector';
import {persist} from 'effector-storage/local';

import {AppTheme} from '@shared/types';
import {appStarted, rootDomain} from '@shared/effectorRootEntities';
import {LocalStorageKeys, ThemeEnum} from '@shared/constants';
import {safeDeserializeJson} from '@shared/lib/utils';

function createThemeModel(domain: Domain) {
  const checkIsDarkThemePreferred = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const getInitialThemeValue = (defaultValue: AppTheme): ThemeEnum => {
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

  const applyTheme = (theme: ThemeEnum) => {
    // todo, use attr instead class
    if (theme === ThemeEnum.Dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const initTheme = (themeValue: ThemeEnum) => {
    localStorage.setItem(LocalStorageKeys.App_theme, JSON.stringify(themeValue));
    applyTheme(themeValue);
  };

  //
  const themeValueSchema = z.nativeEnum(ThemeEnum);
  const initialThemeValue = getInitialThemeValue(ThemeEnum.Light);

  const applyThemeFx = domain.createEffect({
    name: 'applyThemeFx',
    handler: (theme: ThemeEnum) => applyTheme(theme),
  });

  const initThemeFx = domain.createEffect({
    name: 'initThemeFx',
    handler: () => initTheme(initialThemeValue),
  });

  const $themeLs = domain.createStore<AppTheme>(initialThemeValue);
  const themeChanged = domain.createEvent<ThemeEnum>('themeChanged');

  persist({
    store: $themeLs,
    key: LocalStorageKeys.App_theme,
  });

  sample({
    clock: appStarted,
    target: initThemeFx,
  });

  sample({
    clock: themeChanged,
    target: $themeLs,
  });

  sample({
    clock: $themeLs,
    target: applyThemeFx,
  });

  return {$themeLs, themeChanged, themeValueSchema};
}

const themeToggleDomain = rootDomain.createDomain('themeToggleDomain');

export const {$themeLs, themeChanged, themeValueSchema} = createThemeModel(themeToggleDomain);
