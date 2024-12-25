import {ReactNode} from 'react';

import {cn} from '@shared/lib/utils';

type MainProps = {
  children: ReactNode;
  className?: string;
};

export const Main = ({children, className}: MainProps) => {
  return (
    <main
      className={cn(
        'container mx-auto flex min-h-[60px] w-full max-w-[1200px] items-start gap-2 bg-background',
        className,
      )}
    >
      {children}
    </main>
  );
};
