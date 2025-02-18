import {ReactNode} from 'react';

import {cn} from '@shared/lib/className';

type PapperProps = {
  children: ReactNode;
  className?: string;
};

export const Papper = ({children, className}: PapperProps) => {
  return <div className={cn('rounded-lg bg-foreground px-4 py-3', className)}>{children}</div>;
};
