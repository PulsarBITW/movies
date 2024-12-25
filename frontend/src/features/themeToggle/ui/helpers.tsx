import {ReactElement} from 'react';
import {Moon, Sun} from 'lucide-react';

import {ThemeEnum} from '@shared/constants';

export const renderThemeIcon = (currentTheme: ThemeEnum): ReactElement => {
  const className = 'stroke-text-primary';

  switch (currentTheme) {
    case ThemeEnum.Dark:
      return <Moon className={className} />;
    case ThemeEnum.Light:
      return <Sun className={className} />;
    default:
      return <Sun className={className} />;
  }
};
