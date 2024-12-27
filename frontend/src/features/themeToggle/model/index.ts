import {AppTheme} from '@shared/types';
import {rootDomain} from '@shared/effectorRootEntities';
import {ThemeEnum} from '@shared/constants';
import {applyTheme, getInitialThemeValue} from './utils';

const themeToggleDomain = rootDomain.createDomain('themeToggleDomain');

export const initialThemeValue = getInitialThemeValue(ThemeEnum.Light);

export const applyThemeFx = themeToggleDomain.createEffect({
  name: 'applyThemeFx',
  handler: (theme: ThemeEnum) => applyTheme(theme),
});

export const $themeLs = themeToggleDomain.createStore<AppTheme>(initialThemeValue);
export const themeChanged = themeToggleDomain.createEvent<ThemeEnum>('themeChanged');
