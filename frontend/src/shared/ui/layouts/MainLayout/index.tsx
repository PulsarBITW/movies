import {Outlet} from 'react-router-dom';

import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';

export const MainLayout = () => {
  return (
    <div className="grid-rows-layout grid min-h-screen gap-6">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};
