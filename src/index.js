import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/App';
import { AuthProvider } from './hooks/useAuth'

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);


