import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import stores from './stores/index';

export const storesCtx = React.createContext(stores);

ReactDOM.render(
  <React.StrictMode>
    <storesCtx.Provider value={ stores }>
      <App />
    </storesCtx.Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);
