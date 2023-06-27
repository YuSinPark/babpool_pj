import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './AuthStore/Owner-auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode>, */}
  </AuthContextProvider>
);


