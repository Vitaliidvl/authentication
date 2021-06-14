import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContexProvider } from './store/auth-contex';

ReactDOM.render(
  <AuthContexProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContexProvider>,
  document.getElementById('root')
);
