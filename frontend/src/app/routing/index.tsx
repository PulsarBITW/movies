import {Route, Routes} from 'react-router-dom';

import {MainLayout} from '@layouts/MainLayout';
import {ThemePage} from '@pages/themePage';
import {MainPage} from '@pages/main';

const AppRouting = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<MainPage />} />
      <Route path="/top-views" element={<MockPage title="Top Views" />} />
      <Route path="/theme-page" element={<ThemePage />} />
      <Route path="/films" element={<MockPage title="Films" />} />
      <Route path="/series" element={<MockPage title="Series" />} />
      <Route path="/my-list" element={<MockPage title="My list" />} />
      <Route path="/profile" element={<MockPage title="Profile" />} />
      <Route path="/news" element={<MockPage title="News" />} />
      <Route path="/faq" element={<MockPage title="FAQ" />} />
    </Route>

    <Route path="/auth" element={<MockPage title="Auth" />} />
    <Route path="*" element={<div className="bg-destructive">Not found</div>} />
  </Routes>
);

const MockPage = ({title}: {title: string}) => {
  return <div className='gap-4" flex w-full flex-col px-2 text-text-primary'>{title}</div>;
};

export default AppRouting;
