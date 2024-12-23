import {ReactNode} from 'react';

type OutletWrapperProps = {
  children: ReactNode;
};

export const OutletWrapper = ({children}: OutletWrapperProps) => {
  return (
    <main className="w-full min-h-[60px] max-w-[1200px] flex items-center gap-2 bg-background mx-auto container ">
      {children}
    </main>
  );
};
