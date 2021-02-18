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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.colorBarRef = React.createRef(null);
    
    // Bind this to methods
    this.getColor = this.getColor.bind(this);
  }

  // Returns hex of currently selected color, as in the colorBarComponent
  getColor() { 
    return this.colorBarRef.current.state.color;
  }

  render() {
    return (
      <div className="App">
        <ColorBarComponent ref={this.colorBarRef} themeDict={themeDict.other}/>
        <MapComponent themeDict={themeDict.other} getColor={this.getColor}/>
        <Button style={{ zIndex: 1, position: "absolute", top: "50%", left: 10, width: 100, height: 30 }} color="primary" variant="contained" onClick={() => { console.log(this.colorBarRef.current.state.color); }}>Get color</Button>
        {/*FIXME: above is a test button, please remove */}
      </div>
    );
  }
}

export default App