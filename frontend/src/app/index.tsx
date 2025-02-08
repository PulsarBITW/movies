import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {allSettled} from 'effector';
import {Provider} from 'effector-react';

import {appScope, appStarted} from '@shared/config';
import AppRouting from './routing';
import './initModules';

const rootHtml = document.getElementById('root');

if (!rootHtml) {
  console.error('root is missing in DOM');
} else {
  const reactRoot = ReactDOM.createRoot(rootHtml);

  allSettled(appStarted, {scope: appScope});

  reactRoot.render(
    <Provider value={appScope}>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </Provider>,
  );
}
