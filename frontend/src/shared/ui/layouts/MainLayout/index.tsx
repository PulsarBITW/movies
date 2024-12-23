import {Outlet} from 'react-router-dom';
import {Header} from './Header';
import {OutletWrapper} from './OutletWrapper';
import {Footer} from './Footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </div>
  );
};
