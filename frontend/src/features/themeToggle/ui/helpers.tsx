import {ReactElement} from 'react';
import {Moon, Sun} from 'lucide-react';

import {ThemeEnum} from '@shared/config';

export const renderThemeIcon = (currentTheme: ThemeEnum): ReactElement => {
  return currentTheme === ThemeEnum.Dark ? <Moon /> : <Sun />;
};
