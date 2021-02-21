// Import React
import React from "react";

// Import css
import './App.css';

// Import custom components
import MenuComponent from "./components/MenuComponent";
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
import createRegionNameDict from './scripts/createRegionNameDict.js';

// Import deep clone
import cloneDeep from "clone-deep";

// Convert mapAdmin to a prototype, const dictionary indexed by regionID
const regionDictDefault = createRegionDict(mapAdmin);

// Create a constant dictionary mapping index of region to name of region, as opposed to keeping this repeated info contained in every single entry in the scenario data
const regionNameDict = createRegionNameDict(mapAdmin);
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
    this.regionNameDict = regionNameDict;
    this.themeDict = themeDict;
    // Numerous refs
    this.colorBarRef = React.createRef(null);
    this.mapRef = React.createRef(null);

    // Bind this to methods
    this.getColor = this.getColor.bind(this);
    this.assignRegion = this.assignRegion.bind(this);
    this.updateActiveEntry = this.updateActiveEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.updateEventDate = this.updateEventDate.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
  }

  // Returns hex of currently selected color, as in the colorBarComponent
  getColor() {
    return this.colorBarRef.current.state.color; // TODO: not the best practice, but using refs does make it easy
  }

  // Adds entry in position at specified index in scenarioData, new entry has no date nor event
  addEntry(index) {
    let currentData = cloneDeep(this.state.scenarioData);
    let newRegionDict = null;
    if (index > 0) { // use the regionDict of the previous entry as the starting spot
      newRegionDict = createScenarioEntry(currentData[index - 1].regionDict);
    } else { // use the default regionDict if we are to insert at the beginning, currently this is not possible as it seems to lead to a multi-rerender yet some code is not ran in app.render scenario, and I get a regionDict undefined thing which I have no idea why; in light of this, I didn't do the add entry button in front of the first entry
      newRegionDict = createScenarioEntry(regionDictDefault);
    }
    currentData.splice(index, 0, newRegionDict);
    this.setState({ scenarioData: currentData }, () => {this.updateActiveEntry(index);});
  }

  // Deletes entry in position at specified index in scenarioData
  deleteEntry(index) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData.splice(index, 1);
    if (index === this.state.scenarioData.length-1) {
      // Deleted entry is last entry, hence new entry to be focused on is the entry before the last entry
      let newIndex = index-1;
      // To avoid possibly access invalid active entry values, we update the activeEntry first, then update the scenarioDict to delete the entry
      this.updateActiveEntry(newIndex, () => {this.setState({ scenarioData: currentData });}) // Note reset style is included in the updateActiveEntry function already
    } else {
      // Deleted entry was not the last entry, hence new entry to be focused on is the entry after the deleted entry, i.e. activeEntry index need not change
      this.setState({ scenarioData: currentData }, () => {this.mapRef.current.resetAllRegionStyle();});
    }
  }

  // Updates event date for active entry, expects a string argument
  updateEventDate(date) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].date = date;
    this.setState({ scenarioData: currentData });
  }

  // Updates event description for active entry, expects a string argument
  updateEvent(event) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].event = event;
    this.setState({ scenarioData: currentData });
  }

  // Clears date and event of the current active entry
  clearEntry() {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].event = "";
    currentData[this.state.activeEntry].date = "";
    this.setState({ scenarioData: currentData });
  }

  // Updates index for active entry
  updateActiveEntry(newIndex, callback=null) {
    this.setState(
      { activeEntry: newIndex },
      () => {
        this.mapRef.current.resetAllRegionStyle(); // TODO: not the best practice, but using refs does make it easy
        if (callback) { // runs callback if callback is not null
          callback();
        }
      });
  }

  // Assigns region of specified index the currently selected color
  assignRegion(index) {
    const color = this.getColor();
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].regionDict[index].color = color;
    this.setState({ scenarioData: currentData });
  }

  render() {
    return (
      <div className="App">
        <MenuComponent data={this.state.scenarioData}></MenuComponent>
        <TimelineComponent updateActiveEntry={this.updateActiveEntry} activeEntry={this.state.activeEntry} scenarioData={this.state.scenarioData} addEntry={this.addEntry} updateEventDate={this.updateEventDate} updateEvent={this.updateEvent} deleteEntry={this.deleteEntry} clearEntry={this.clearEntry} themeDict={this.themeDict.other}/>
        <ColorBarComponent ref={this.colorBarRef} themeDict={this.themeDict.other} />
        <MapComponent themeDict={this.themeDict.other} baseMap={mapAdmin} assignRegion={this.assignRegion} regionDict={this.state.scenarioData[this.state.activeEntry].regionDict} ref={this.mapRef} />
      </div>
    );
  }
}

export default App;