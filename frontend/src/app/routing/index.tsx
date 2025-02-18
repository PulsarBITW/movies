import {Navigate, Route, Routes} from 'react-router-dom';

import {AuthLayout} from '@layouts/AuthLayout';
import {MainLayout} from '@layouts/MainLayout';
import {ThemePage} from '@pages/themePage';
import {MainPage} from '@pages/main';
import {SignIn} from '@pages/signIn';
import {ProfilePage} from '@pages/profile';
import {TestSearchParamsPage} from '@pages/testSearchParams';
import {NavigationConnecter} from './NavigationConnecter';

const App = () => {
  return (
    <>
      {/* Connect API */}
      <NavigationConnecter />
      {/*  */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/top-views" element={<MockPage title="Top Views" />} />
          <Route path="/test-search-params" element={<TestSearchParamsPage />} />
          <Route path="/theme-page" element={<ThemePage />} />
          <Route path="/films" element={<MockPage title="Films" />} />
          <Route path="/series" element={<MockPage title="Series" />} />
          <Route path="/my-list" element={<MockPage title="My list" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/news" element={<MockPage title="News" />} />
          <Route path="/faq" element={<MockPage title="FAQ" />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="sign-in" replace />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<MockPage title="sign-up" />} />
          <Route path="reset-credentials" element={<MockPage title="reset-credentials" />} />
        </Route>

        <Route path="*" element={<div className="bg-destructive">Not found</div>} />
      </Routes>
    </>
  );
};

const MockPage = ({title}: {title: string}) => {
  return <div className='gap-4" flex w-full flex-col px-2 text-text-primary'>{title}</div>;
};

export default App;
