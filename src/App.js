// Import React
import React from "react";
import Button from '@material-ui/core/Button';

// Import css
import './App.css';

// Import custom components
import MapComponent from './components/MapComponent.js';
import ColorBarComponent from './components/ColorBarComponent';
import TimelineComponent from "./components/TimelineComponent";

// Import default themeDict
import themeDict from './themes/default';

// Import default basemap geojson
import mapAdmin from "./assets/basemap/mapAdmin.json";

// Import scripts
import createRegionDict from './scripts/createRegionDict.js';
import createScenarioEntry from './scripts/createScenarioEntry.js';

// Convert mapAdmin to a prototype, const dictionary indexed by regionID
const regionDictDefault = createRegionDict(mapAdmin);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scenarioData: [ // Array of information for the scenarios
        createScenarioEntry(regionDictDefault, "2000 January 1", "An Event"), // Default is 2 entry with the default regionDict, empty date and event entry
        createScenarioEntry(regionDictDefault, "2010 January 1", "Another Event"),
      ],
      activeEntry: 0, // index of currently active on map entry in scenarioData
    }
    this.themeDict = themeDict;
    this.colorBarRef = React.createRef(null);
    
    // Bind this to methods
    this.getColor = this.getColor.bind(this);
    this.assignRegion = this.assignRegion.bind(this);
    this.updateActiveEntry = this.updateActiveEntry.bind(this);
  }

  // Returns hex of currently selected color, as in the colorBarComponent
  getColor() { 
    return this.colorBarRef.current.state.color;
  }

  // Updates index for active entry
  updateActiveEntry(newIndex) {
    this.setState({activeEntry: newIndex});
  }

  //
  assignRegion(index) {
    const color = this.getColor();
    let currentData = this.state.scenarioData;
    currentData[this.state.activeEntry].regionDict[index].color = color;
    this.setState({scenarioData : currentData});
  }

  render() {
    return (
      <div className="App">
        <TimelineComponent updateActiveEntry={this.updateActiveEntry} activeEntry={this.state.activeEntry} scenarioData={this.state.scenarioData} themeDict={this.themeDict.other}/>
        <ColorBarComponent ref={this.colorBarRef} themeDict={this.themeDict.other}/>
        <MapComponent themeDict={this.themeDict.other} baseMap={mapAdmin} assignRegion={this.assignRegion} regionDict={this.state.scenarioData[this.state.activeEntry].regionDict}/>
        <Button style={{ zIndex: 1, position: "absolute", top: "50%", left: 10, width: 100, height: 30 }} color="primary" variant="contained" onClick={() => { console.log(this.colorBarRef.current.state.color); }}>Get color</Button>
        {/*FIXME: above is a test button, please remove */}
      </div>
    );
  }
}

export default App