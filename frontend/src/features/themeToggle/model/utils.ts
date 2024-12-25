import {ThemeEnum} from '@shared/constants';
import {initLocalStorageValue, InitLocalStorageValueParams} from '@shared/lib/utils';

export const applyTheme = (theme: ThemeEnum) => {
  // todo, use attr instead class
  if (theme === ThemeEnum.Dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
};

export const initThemeValue = (config: InitLocalStorageValueParams<ThemeEnum>): ThemeEnum => {
  const value = initLocalStorageValue(config);
  applyTheme(value);

  return value;
};
