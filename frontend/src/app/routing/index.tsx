import {Route, Routes} from 'react-router-dom';

import {MainLayout} from '@shared/ui';
import {ThemePage} from '@pages/themePage';

const AppRouting = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<MockPage title="Main" />} />
      <Route path="/top-views" element={<MockPage title="Top Views" />} />
      <Route path="/theme-page" element={<ThemePage />} />
    </Route>

    <Route path="/auth" element={<MockPage title="Auth" />} />
    <Route path="*" element={<div className="bg-destructive">Not found</div>} />
  </Routes>
);

const MockPage = ({title}: {title: string}) => {
  return <div className='gap-4" flex w-full flex-col text-text-primary'>{title}</div>;
};

export default AppRouting;
