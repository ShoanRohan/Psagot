import './App.css';
import store from './features/store';
import AppRouter from './routers/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

