import {ReactNode} from 'react';

type GroupProps = {
  title?: string;
  children: ReactNode;
};

export const Group = ({title, children}: GroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      {title && <h2 className="font-bold text-text-primary">{title}</h2>}
      {children}
    </div>
  );
};
