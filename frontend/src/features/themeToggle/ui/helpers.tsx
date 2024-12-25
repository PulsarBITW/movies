import {ReactElement} from 'react';
import {Moon, Sun} from 'lucide-react';

import {ThemeEnum} from '../enums';

export const renderThemeIcon = (currentTheme: ThemeEnum): ReactElement => {
  const className = 'stroke-text-primary';

  switch (currentTheme) {
    case ThemeEnum.dark:
      return <Moon className={className} />;
    case ThemeEnum.light:
      return <Sun className={className} />;
    default:
      return <Sun className={className} />;
  }
};
