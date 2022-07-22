import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App';

import {store} from './redux/store'
import {Context} from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context.Provider value={{fetch}}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
