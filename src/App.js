// Import React
import React from "react";
import Button from '@material-ui/core/Button';

// Import css
import './App.css';

// Import custom components
import MapComponent from './components/MapComponent.js';
import ColorBarComponent from './components/ColorBarComponent';

// Import default themeDict
import themeDict from './themes/default';

export default function App() {
  // References as using a state seems to make rerendering a problem
  const colorBarRef = React.useRef(null); // To get currently selected color, use the expression colorBarRef.current.state.color

  return (
    <div className="App">
      <ColorBarComponent ref={colorBarRef}/>
      <MapComponent themeDict={themeDict.other}/>
      <Button style={{zIndex:1, position:"absolute", top:"50%", left: 10, width: 100, height: 30}} color="primary" variant="contained" onClick={() => {console.log(colorBarRef.current.state.color);}}>Get color</Button>
      {/*FIXME: above is a test button, please remove */}
    </div>
  );
}
