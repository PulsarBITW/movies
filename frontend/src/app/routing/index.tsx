import {Route, Routes} from 'react-router-dom';
import {MainLayout, Papper} from '@shared/ui';

const Page = () => {
  return (
    <Papper className="w-full">
      <div className="flex flex-col gap-2">
        <div className="text-text-primary">primary primary primary primary</div>
        <div className="text-text-secondary">secondary secondary secondary</div>
        <div className="text-text-muted">muted muted muted muted muted</div>
      </div>
    </Papper>
  );
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
