import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useUnit} from 'effector-react';
import {LogIn, MoreHorizontal, Search} from 'lucide-react';

import {$screenType} from '@entities/screenType';
import {ThemeToggler} from '@features/themeToggle';
import {ScreenTypeEnum} from '@shared/constants';
import {Button} from '@shared/ui';
import {NavSheet} from './navSheet';
import {NavMenu} from './navMenu';
import {filterNavLinkList} from './utils';
import {otherNavLinkList, primaryNavLinkList} from './constants';

export const Header = () => {
  const [screenType] = useUnit([$screenType]);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const toggleAuth = () => setIsAuth(!isAuth);

  const isBelowTablet =
    screenType === ScreenTypeEnum.mobile || screenType === ScreenTypeEnum.tablet;

  return (
    <header className="sticky top-0 z-10 flex min-h-[60px] w-full items-center gap-2 bg-header shadow">
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-2 text-text-primary">
        {isBelowTablet ? (
          <>
            <NavSheet isAuth={isAuth} toggleAuth={toggleAuth} />

            <Button variant="ghost" className="text-base [&_svg]:size-5">
              <Search />
              Search
            </Button>

            <Button asChild size="icon">
              <Link to="/auth">
                <LogIn />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Link to="/">
              <h1 className="text-2xl font-bold">Movies</h1>
            </Link>

            <div className="flex gap-2">
              <NavMenu
                linkList={filterNavLinkList(primaryNavLinkList, isAuth)}
                triggerContent="Catalog"
              />
              <Button variant="ghost" className="text-base [&_svg]:size-5">
                <Search />
                Search
              </Button>
              <NavMenu
                linkList={filterNavLinkList(otherNavLinkList, isAuth)}
                triggerContent={<MoreHorizontal />}
                skipIndicator
              />
            </div>

            <div className="flex gap-2">
              <ThemeToggler />
              <Button asChild>
                <Link to="/auth">Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
