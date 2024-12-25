import {ThemeEnum} from './enums';

export const checkIsDarkTheme = () => {
  return document.documentElement.classList.contains('dark');
};

export const getCurrentTheme = () => {
  return checkIsDarkTheme() ? ThemeEnum.dark : ThemeEnum.light;
};
