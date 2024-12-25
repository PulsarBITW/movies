import {useState} from 'react';

import {Button} from '@shared/ui';
import {ThemeEnum} from '@shared/constants';
import {getCurrentTheme} from '../utils';
import {renderThemeIcon} from './helpers';

export const ThemeToggler = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(getCurrentTheme);

  const toggleTheme = () => {
    if (currentTheme === ThemeEnum.Dark) {
      document.documentElement.classList.remove('dark');
      setCurrentTheme(ThemeEnum.Light);
    } else {
      document.documentElement.classList.add('dark');
      setCurrentTheme(ThemeEnum.Dark);
    }
  };

  return (
    <Button
      className="bg-accent hover:bg-accent-foreground [&_svg]:size-5"
      size="icon"
      onClick={toggleTheme}
    >
      {renderThemeIcon(currentTheme)}
    </Button>
  );
};
