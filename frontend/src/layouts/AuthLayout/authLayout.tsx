import {NavLink, Outlet} from 'react-router-dom';

import {Papper} from '@shared/ui';

const tabs: AuthTab[] = [
  {
    to: 'sign-in',
    title: 'signIn',
  },
  {
    to: 'sign-up',
    title: 'signUp',
  },
  {
    to: 'reset-credentials',
    title: 'reset',
  },
];

export const AuthLayout = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <h1 className="mb-6 text-center text-2xl font-bold text-text-primary">Movies</h1>
        <Papper className="w-full min-w-[320px] max-w-[420px] px-6 py-6">
          <TabList tabs={tabs} />
          <Outlet />
        </Papper>
      </div>
    </div>
  );
};

type AuthTab = {
  to: string;
  title: string;
};

const Tab = ({to, title}: AuthTab) => {
  return (
    <NavLink
      to={to}
      className={(linkState) =>
        linkState.isActive
          ? 'rounded-lg bg-primary-light px-2 py-1 text-center text-secondary'
          : 'rounded-lg px-2 py-1 text-center text-secondary'
      }
    >
      {title}
    </NavLink>
  );
};

const TabList = ({tabs}: {tabs: AuthTab[]}) => {
  return (
    <div className="grid w-full grid-cols-3 gap-2 rounded-lg border p-2">
      {tabs.map((tab) => (
        <Tab key={tab.to} {...tab} />
      ))}
    </div>
  );
};
