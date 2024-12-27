import {sample} from 'effector';
import {persist} from 'effector-storage/local';

import {LocalStorageKeys} from '@shared/constants';
import {initTheme} from './utils';
import {$themeLs, applyThemeFx, initialThemeValue, themeChanged} from '.';

initTheme(initialThemeValue);

persist({
  store: $themeLs,
  key: LocalStorageKeys.App_theme,
});

sample({
  clock: themeChanged,
  target: $themeLs,
});

sample({
  clock: $themeLs,
  target: applyThemeFx,
});
