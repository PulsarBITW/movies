import {ReactNode} from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';

import {cn} from '@shared/lib/utils';

type HeaderNavLinkProps = Omit<NavLinkProps, 'children'> & {
  icon: ReactNode;
  linkTitle: ReactNode;
};

export const HeaderNavLink = ({icon, linkTitle, className, ...props}: HeaderNavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({isActive}) =>
        cn(
          'flex gap-2 rounded-lg p-2 text-text-primary transition-colors hover:bg-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary [&_svg]:size-6',
          isActive && 'current group bg-accent-foreground',
          className,
        )
      }
    >
      <div className="relative flex items-center justify-center group-[.current]:after:absolute group-[.current]:after:left-0 group-[.current]:after:top-full group-[.current]:after:h-1 group-[.current]:after:w-full group-[.current]:after:bg-primary group-[.current]:after:content-['']">
        {icon}
      </div>
      <div>{linkTitle}</div>
    </NavLink>
  );
};
