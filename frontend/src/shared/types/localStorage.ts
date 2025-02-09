import {ThemeEnum} from '@shared/config';

type AppLatestView = {
  id: string;
  genre: string;
  progress: string;
};

/**@description Data types after deserialization */
export type AppLatestViews = AppLatestView[];
export type AppLastPage = string;
export type AppTheme = ThemeEnum;

export type LocalStorageValuesUnion = AppLatestViews | AppLastPage | AppTheme;
