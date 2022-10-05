import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import { appReducer } from './redux/reducer/reducer';

import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

const store = createStore(appReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <CookiesProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CookiesProvider>
    </Provider>
  </BrowserRouter>
);
