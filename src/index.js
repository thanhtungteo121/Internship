import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store,persistor } from "./redux/store";
import App from './App';
import "./component/assets/css/now-ui-kit.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/lib/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={'Lấy code từ google api'}>
        <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </GoogleOAuthProvider>
        </PersistGate>
      </QueryClientProvider>
  </React.StrictMode>
);
