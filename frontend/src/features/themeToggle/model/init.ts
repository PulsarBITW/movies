import {sample} from 'effector';
import {persist} from 'effector-storage/local';

import {appStarted} from '@shared/effectorRootEntities';
import {lsThemeConfig} from './constants';
import {$lsTheme, applyThemeFx, initThemeFx, themeChanged} from '.';

$lsTheme.on(initThemeFx.doneData, (_, theme) => theme);

persist({
  store: $lsTheme,
  key: lsThemeConfig.key,
  done: applyThemeFx,
});

sample({
  clock: appStarted,
  fn: () => lsThemeConfig,
  target: initThemeFx,
});

sample({
  clock: themeChanged,
  target: $lsTheme,
});
