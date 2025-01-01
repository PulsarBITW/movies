import {NavLinkItem} from './constants';

export const filterNavLinkList = (navLinkList: NavLinkItem[], isAuth: boolean): NavLinkItem[] => {
  return navLinkList.filter((navLink) => !navLink.authOnly || isAuth);
};
