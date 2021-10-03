import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

//Our react application will control everything inside the root
//division tag in your html document.
 ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
   document.getElementById('root')
 );