import {ReactNode} from 'react';
import {CircleHelp, Flame, House, Newspaper, Palette, Star} from 'lucide-react';

import Films from '@assets/films.svg';
import Series from '@assets/series.svg';

export type NavLinkItem = {
  icon: ReactNode;
  title: ReactNode;
  to: string;
  authOnly?: boolean;
};

export const primaryNavLinkList: NavLinkItem[] = [
  {
    title: 'Main',
    to: '/',
    icon: <House />,
  },
  {title: 'Theme page', to: '/theme-page', icon: <Palette />},
  {title: 'Top views', to: '/top-views', icon: <Flame />},
  {title: 'Films', to: '/films', icon: <Films className="fill-text-primary" />},
  {title: 'Series', to: '/series', icon: <Series className="fill-text-primary" />},
  {
    title: 'My list',
    to: '/my-list',
    icon: <Star />,
    authOnly: true,
  },
];

export const otherNavLinkList: NavLinkItem[] = [
  {title: 'News', to: '/news', icon: <Newspaper />},
  {title: 'FAQ', to: '/faq', icon: <CircleHelp />},
];
