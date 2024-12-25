import {useUnit} from 'effector-react';

import {Button} from '@shared/ui';
import {ThemeEnum} from '@shared/constants';
import {$lsTheme, themeChanged} from '../model';
import {renderThemeIcon} from './helpers';

export const ThemeToggler = () => {
  const [theme, setTheme] = useUnit([$lsTheme, themeChanged]);

  const toggleTheme = () => {
    if (theme === ThemeEnum.Dark) setTheme(ThemeEnum.Light);
    else setTheme(ThemeEnum.Dark);
  };

  return (
    <Button
      className="bg-accent hover:bg-accent-foreground [&_svg]:size-5"
      size="icon"
      onClick={toggleTheme}
    >
      {renderThemeIcon(theme)}
    </Button>
  );
};
