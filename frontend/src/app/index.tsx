import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import AppRouting from './routing';
import './global.css';

const rootHtml = document.getElementById('root');

if (!rootHtml) {
  console.error('root is missing in DOM');
} else {
  const reactRoot = ReactDOM.createRoot(rootHtml);

  reactRoot.render(
    <BrowserRouter>
      <AppRouting />
    </BrowserRouter>,
  );
}
