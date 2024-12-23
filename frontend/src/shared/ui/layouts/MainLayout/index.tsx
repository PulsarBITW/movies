import {Outlet} from 'react-router-dom';
import {Header} from './Header';
import {OutletWrapper} from './OutletWrapper';
import {Footer} from './Footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </div>
  );
};
