import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {appStarted} from '@shared/effectorRootEntities';
import AppRouting from './routing';
import './initModules';

const rootHtml = document.getElementById('root');

if (!rootHtml) {
  console.error('root is missing in DOM');
} else {
  const reactRoot = ReactDOM.createRoot(rootHtml);

  appStarted();
  reactRoot.render(
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>,
  );
}
