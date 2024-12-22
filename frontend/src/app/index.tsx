import {baseFetchMovies} from '@shared/api';
import ReactDOM from 'react-dom/client';

const rootHtml = document.getElementById('root');
if (!rootHtml) {
  console.log('root is missing in DOM');
} else {
  const reactRoot = ReactDOM.createRoot(rootHtml);

  reactRoot.render(
    <div>
      <h1>APP</h1>
      <button onClick={() => baseFetchMovies()}>request</button>
    </div>,
  );
}
