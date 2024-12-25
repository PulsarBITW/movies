import {AppTheme} from '@shared/types/localStorage';
import {ThemeEnum, LocalStorageKeys} from '@shared/constants';

export type LsThemeConfig = {
  key: LocalStorageKeys.App_theme;
  initialValue: AppTheme;
};

export const lsThemeConfig: LsThemeConfig = {
  key: LocalStorageKeys.App_theme,
  initialValue: ThemeEnum.Light,
};
