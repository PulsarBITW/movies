import ReactDOM from 'react-dom/client';

import {baseFetchMovies} from '@shared/api';
import './global.css';

const rootHtml = document.getElementById('root');
if (!rootHtml) {
  console.error('root is missing in DOM');
} else {
  const reactRoot = ReactDOM.createRoot(rootHtml);

  reactRoot.render(
    <div>
      <h1>APP</h1>
      <button className="rounded-md text-text" onClick={() => baseFetchMovies()}>
        request
      </button>
    </div>,
  );
}
