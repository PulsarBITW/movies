import {ReactNode} from 'react';
import cn from 'classnames';

type PapperProps = {
  children: ReactNode;
  className: string;
};

export const Papper = ({children, className}: PapperProps) => {
  return <div className={cn('bg-foreground rounded-lg px-4 py-3', className)}>{children}</div>;
};
