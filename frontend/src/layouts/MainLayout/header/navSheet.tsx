import {Link} from 'react-router-dom';
import {AlignJustify, LogIn, X} from 'lucide-react';

import {ThemeToggler} from '@features/themeToggle';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/ui';
import {filterNavLinkList} from './utils';
import {otherNavLinkList, primaryNavLinkList} from './constants';
import {HeaderNavLink} from './headerNavLink';

type NavSheetProps = {
  isAuth: boolean;
  toggleAuth: () => void;
};

export const NavSheet = ({isAuth, toggleAuth}: NavSheetProps) => {
  const filteredNavLinkList = filterNavLinkList(primaryNavLinkList, isAuth).concat(
    filterNavLinkList(otherNavLinkList, isAuth),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="accent" size="icon">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-0 border-0 bg-foreground p-0"
        showCloseButton={false}
      >
        <SheetHeader className="flex flex-row items-center justify-between gap-4 space-y-0 border-b border-accent px-4 py-2">
          <div className="flex items-center gap-4">
            <SheetTitle>Movies</SheetTitle>
            <ThemeToggler variant="ghost" className="[&_svg]:size-5" />
          </div>
          <SheetClose asChild className="data-[state=open]">
            <Button variant="ghost" size="icon" className="text-text-primary [&_svg]:size-5">
              <X />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-auto px-4 py-2">
          <ul className="flex flex-col gap-2">
            {filteredNavLinkList.map((navLink, i) => (
              <li key={i}>
                <SheetClose asChild>
                  <HeaderNavLink to={navLink.to} icon={navLink.icon} linkTitle={navLink.title} />
                </SheetClose>
              </li>
            ))}
          </ul>
          <Button onClick={toggleAuth}>{isAuth ? 'LogOut' : 'Login'}</Button>
        </div>

        <div className="flex justify-end border-t border-accent px-4 py-4">
          {isAuth ? (
            <div className="flex items-center gap-4">
              <div className="text-lg text-text-primary">User user</div>
              <SheetClose asChild>
                <Link to="/profile">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <Button>
              Login
              <LogIn />
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
