import {useState} from 'react';

import {Button} from '@shared/ui';
import {ThemeEnum} from '../enums';
import {getCurrentTheme} from '../utils';
import {renderThemeIcon} from './helpers';

export const ThemeToggler = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(getCurrentTheme);

  const toggleTheme = () => {
    if (currentTheme === ThemeEnum.dark) {
      document.documentElement.classList.remove('dark');
      setCurrentTheme(ThemeEnum.light);
    } else {
      document.documentElement.classList.add('dark');
      setCurrentTheme(ThemeEnum.dark);
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
