import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import Cesium
import { Ion } from "cesium";

// Import config
import config from './config.json';

// Use Cesium Ion token
Ion.defaultAccessToken = config.cesiumIonAccessToken;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
