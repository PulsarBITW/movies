import {ReactNode} from 'react';

type OutletWrapperProps = {
  children: ReactNode;
};

export const OutletWrapper = ({children}: OutletWrapperProps) => {
  return (
    <main className="container mx-auto flex min-h-[60px] w-full max-w-[1200px] items-center gap-2 bg-background">
      {children}
    </main>
  );
};
