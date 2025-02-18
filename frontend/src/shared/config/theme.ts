export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light',
}

export enum ScreenTypeEnum {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

/**@description Contains the max-width in pixels for different screen types. */
export const breakPoints = {
  mobile: 768,
  tablet: 1024,
} as const;
