import {useUnit} from 'effector-react';

import {Button, ButtonProps} from '@shared/ui';
import {ThemeEnum} from '@shared/constants';
import {$themeLs, themeChanged} from '../model';
import {renderThemeIcon} from './helpers';

export const ThemeToggler = ({variant = 'accent', size = 'icon', ...otherProps}: ButtonProps) => {
  const [theme, setTheme] = useUnit([$themeLs, themeChanged]);

  const toggleTheme = () => {
    if (theme === ThemeEnum.Dark) setTheme(ThemeEnum.Light);
    else setTheme(ThemeEnum.Dark);
  };

  return (
    <Button variant={variant} size={size} onClick={toggleTheme} {...otherProps}>
      {renderThemeIcon(theme)}
    </Button>
  );
};
