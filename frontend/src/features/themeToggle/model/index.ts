import {Done} from 'effector-storage/local';

import {AppTheme} from '@shared/types';
import {rootDomain} from '@shared/effectorRootEntities';
import {ThemeEnum} from '@shared/constants';
import {LsThemeConfig, lsThemeConfig} from './constants';
import {applyTheme, initThemeValue} from './utils';

const themeToggleDomain = rootDomain.createDomain('themeToggleDomain');

export const initThemeFx = themeToggleDomain.createEffect({
  name: 'initThemeFx',
  handler: (config: LsThemeConfig) => initThemeValue(config),
});

export const applyThemeFx = themeToggleDomain.createEffect({
  name: 'applyThemeFx',
  handler: ({value}: Done<ThemeEnum>) => applyTheme(value),
});

export const $themeLs = themeToggleDomain.createStore<AppTheme>(lsThemeConfig.initialValue);
export const themeChanged = themeToggleDomain.createEvent<ThemeEnum>('themeChanged');
