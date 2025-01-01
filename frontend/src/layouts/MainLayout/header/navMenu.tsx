import {ReactNode} from 'react';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@shared/ui/navigationMenu';
import {NavLinkItem} from './constants';
import {HeaderNavLink} from './headerNavLink';

type NavMenuProps = {
  linkList: NavLinkItem[];
  triggerContent: ReactNode;
  skipIndicator?: boolean;
};

export const NavMenu = ({linkList, skipIndicator, triggerContent}: NavMenuProps) => {
  return (
    <NavigationMenu classNameViewPortWrapper="left-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base" skipIndicator={skipIndicator}>
            {triggerContent}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-3">
            <ul className="flex w-[200px] flex-col gap-2">
              {linkList.map((navLink, i) => (
                <li key={i}>
                  <HeaderNavLink to={navLink.to} icon={navLink.icon} linkTitle={navLink.title} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
