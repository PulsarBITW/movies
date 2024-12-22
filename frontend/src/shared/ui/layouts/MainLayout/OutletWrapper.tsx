import {ReactNode} from 'react';

type OutletWrapperProps = {
  children: ReactNode;
};

export const OutletWrapper = ({children}: OutletWrapperProps) => {
  return (
    <main className="w-full min-h-[60px] flex items-center gap-2 bg-background px-32 bg-white">
      {children}
    </main>
  );
};
