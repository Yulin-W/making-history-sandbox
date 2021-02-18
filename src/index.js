import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import Cesium
import { Ion } from "cesium";

// Use Cesium Ion token
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_ION_TOKEN;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
