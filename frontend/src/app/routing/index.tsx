import {Route, Routes} from 'react-router-dom';
import {MainLayout, Papper} from '@shared/ui';

const Page = () => {
  return <Papper className="h-[2000px] w-full">Page</Papper>;
};

const AppRouting = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Page />} />
      <Route path="/top-views" element={<Page />} />
    </Route>

    <Route path="/auth" element={<Page />} />
    <Route path="*" element={<div>Not found</div>} />
  </Routes>
);

export default AppRouting;
