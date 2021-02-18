// Import React
import React from "react";

// Import css
import './App.css';

// Import custom components
import MapComponent from './components/MapComponent.js';

// Import default themeDict
import themeDict from './themes/default';

export default function App() {
  return (
    <div className="App">
      <MapComponent themeDict={themeDict.other}/>
    </div>
  );
}
