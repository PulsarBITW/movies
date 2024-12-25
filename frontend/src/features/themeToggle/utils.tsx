import {ThemeEnum} from '@shared/constants';

export const checkIsDarkTheme = () => {
  return document.documentElement.classList.contains('dark');
};

export const getCurrentTheme = () => {
  return checkIsDarkTheme() ? ThemeEnum.Dark : ThemeEnum.Light;
};
