import {sample} from 'effector';
import {persist} from 'effector-storage/local';

import {appStarted} from '@shared/effectorRootEntities';
import {lsThemeConfig} from './constants';
import {$themeLs, applyThemeFx, initThemeFx, themeChanged} from '.';

$themeLs.on(initThemeFx.doneData, (_, theme) => theme).on(themeChanged, (_, theme) => theme);

persist({
  store: $themeLs,
  key: lsThemeConfig.key,
  done: applyThemeFx,
});

sample({
  clock: appStarted,
  fn: () => lsThemeConfig,
  target: initThemeFx,
});

sample({
  clock: initThemeFx.doneData,
  target: $themeLs,
});
