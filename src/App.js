// Import React
import React from "react";

// Import css
import './App.css';

// Import custom components
import MenuComponent from "./components/MenuComponent.js";
import MapComponent from './components/MapComponent.js';
import ColorBarComponent from './components/ColorBarComponent.js';
import ToolbarComponent from "./components/ToolbarComponent.js";
import PluginMenuComponent from "./components/PluginMenuComponent.js";
import TimelineBarComponent from './components/TimelineBarComponent.js';
import TimelineEventComponent from './components/TimelineEventComponent.js';

// Import default themeDict
import themeDict from './themes/default';

// Import default basemap geojson
import mapAdmin from "./assets/basemap/mapAdmin.json";

// Import scripts
import createRegionDict from './scripts/createRegionDict.js';
import createScenarioEntry from './scripts/createScenarioEntry.js';
import createRegionNameDict from './scripts/createRegionNameDict.js';

// Import plugins
import plugins from "./appPlugins.js";

// Import deep clone
import cloneDeep from "clone-deep";

// Convert mapAdmin to a prototype, const dictionary indexed by regionID
const regionDictDefault = createRegionDict(mapAdmin);

// Create a constant dictionary mapping index of region to name of region, as opposed to keeping this repeated info contained in every single entry in the scenario data
const regionNameDict = createRegionNameDict(mapAdmin);

// Default scenarioData value
const scenarioDataDefault = [
  createScenarioEntry(regionDictDefault, "2000 January 1", "An Event"), // Default is 2 entry with the default regionDict, empty date and event entry
  createScenarioEntry(regionDictDefault, "2010 January 1", "Another Event"),
];
class App extends React.Component {
  constructor(props) {
    super(props);

    this.plugins = plugins;
    // Default values should ideally all be based off the scenarioDataDefault
    // Setup default state values
    let pluginData = {};
    for (const [name, entry] of Object.entries(this.plugins)) {
      pluginData[name] = entry.initState(scenarioDataDefault);
    }

    let colorData = [];
    let i;
    for (i = 0; i < scenarioDataDefault.length; i++) {
      colorData.push({});
    }

    // Set initial state
    this.state = {
      scenarioData: scenarioDataDefault, // Array of information for the scenarios
      pluginData: pluginData, // Create object for data in plugin indexed by name of plugin
      colorData: colorData, // Dictionary with corresponding entries to scenarioData, that records the number of regions of specific color for the scenario timeline entry
      activeEntry: 0, // index of currently active on map entry in scenarioData
      lassoSelecting: false, // state for whether lasso select tool is activated
      erasing: false, // state for whether eraser tool is activated
    }

    // Declare some constant attributes
    this.regionNameDict = regionNameDict;
    this.themeDict = themeDict;

    // Some attributes for plugins to use
    this.scenarioDataDefault = scenarioDataDefault;
    this.regionDictDefault = regionDictDefault;

    // Numerous refs
    this.colorBarRef = React.createRef(null);
    this.mapRef = React.createRef(null);

    // Bind this to methods
    this.getColor = this.getColor.bind(this);
    this.assignRegions = this.assignRegions.bind(this);
    this.updateActiveEntry = this.updateActiveEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.updateEventDate = this.updateEventDate.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.updatePluginData = this.updatePluginData.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.loadSave = this.loadSave.bind(this);
    this.updateLassoSelecting = this.updateLassoSelecting.bind(this);
    this.updateErasing = this.updateErasing.bind(this);
    this.setDefaultColorBarColor = this.setDefaultColorBarColor.bind(this);
    this.processRegionHoveredOn = this.processRegionHoveredOn.bind(this);
    this.processRegionHoveredOut = this.processRegionHoveredOut.bind(this);
  }

  processRegionHoveredOn(layer) {
    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onProcessRegionHoveredOn) {
        entry.functions.onProcessRegionHoveredOn(this, layer);
      }
    });
  }

  processRegionHoveredOut(layer) {
    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onProcessRegionHoveredOut) {
        entry.functions.onProcessRegionHoveredOut(this, layer);
      }
    });
  }

  // Updates plugin data for the specified plugin with the specified data, the key should be the one used in the plugins dictionary
  updatePluginData(key, data) {
    let currentData = cloneDeep(this.state.pluginData);
    currentData[key] = data;
    this.setState({ pluginData: currentData });
  }

  // Updates lasso selecting, expects true/false boolean value, then runs callback if any
  updateLassoSelecting(newState, callback = null) {
    this.setState({ lassoSelecting: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Update eraser state, such state in turn determins the value getColor returns
  updateErasing(newState) {
    this.setState({ erasing: newState });
  }

  // Returns hex of currently selected color, as in the colorBarComponent
  getColor() {
    return this.state.erasing ? null : this.colorBarRef.current.state.color;
  }

  // Sets color in colorBarComponent, expects a hex string
  setDefaultColorBarColor(color) {
    this.colorBarRef.current.setState({color:color});
  }

  // Adds entry in position at specified index in scenarioData and colorData, new entry has no date nor event
  addEntry(index) {
    let currentData = cloneDeep(this.state.scenarioData);
    let currentColorData = cloneDeep(this.state.colorData);
    let newRegionDict = null;
    let newColorEntry = null;
    if (index > 0) { // use the regionDict, color entry of the previous entry as the starting spot
      newRegionDict = createScenarioEntry(currentData[index - 1].regionDict);
      newColorEntry = cloneDeep(currentColorData[index - 1]);
    } else { // use the default regionDict, color entry if we are to insert at the beginning, currently this is not possible as it seems to lead to a multi-rerender yet some code is not ran in app.render scenario, and I get a regionDict undefined thing which I have no idea why; in light of this, I didn't do the add entry button in front of the first entry
      newRegionDict = createScenarioEntry(regionDictDefault);
      newColorEntry = {};
    }
    currentData.splice(index, 0, newRegionDict);
    currentColorData.splice(index, 0, newColorEntry);
    this.setState({ scenarioData: currentData, colorData: currentColorData }, () => { this.updateActiveEntry(index); });

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onAddEntry) {
        entry.functions.onAddEntry(this, index);
      }
    });
  }

  // Deletes entry in position at specified index in scenarioData and colorData
  deleteEntry(index) {
    let currentData = cloneDeep(this.state.scenarioData);
    let currentColorData = cloneDeep(this.state.colorData);
    currentData.splice(index, 1);
    currentColorData.splice(index, 1);
    if (index === this.state.scenarioData.length - 1) {
      // Deleted entry is last entry, hence new entry to be focused on is the entry before the last entry
      let newIndex = index - 1;
      // To avoid possibly access invalid active entry values, we update the activeEntry first, then update the scenarioDict to delete the entry
      this.updateActiveEntry(newIndex, () => { this.setState({ scenarioData: currentData, colorData: currentColorData }); }) // Note reset style is included in the updateActiveEntry function already
    } else {
      // Deleted entry was not the last entry, hence new entry to be focused on is the entry after the deleted entry, i.e. activeEntry index need not change
      this.setState({ scenarioData: currentData, colorData: currentColorData }, () => { this.mapRef.current.resetAllRegionStyle(); });
    }

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onDeleteEntry) {
        entry.functions.onDeleteEntry(this, index);
      }
    });
  }

  // Updates event date for active entry, expects a string argument
  updateEventDate(date) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].date = date;
    this.setState({ scenarioData: currentData });

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onUpdateEventDate) {
        entry.functions.onUpdateEventDate(this, date);
      }
    });
  }

  // Updates event description for active entry, expects a string argument
  updateEvent(event) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].event = event;
    this.setState({ scenarioData: currentData });

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onUpdateEvent) {
        entry.functions.onUpdateEvent(this, event);
      }
    });
  }

  // Clears date and event of the current active entry, not the map though
  clearEntry() {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].event = "";
    currentData[this.state.activeEntry].date = "";
    this.setState({ scenarioData: currentData });
  }

  // Updates index for active entry
  updateActiveEntry(newIndex, callback = null) {
    this.setState(
      { activeEntry: newIndex },
      () => {
        this.mapRef.current.resetAllRegionStyle();
        if (callback) { // runs callback if callback is not null
          callback();
        }
      });

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onUpdateActiveEntry) {
        entry.functions.onUpdateActiveEntry(this, newIndex);
      }
    });
  }

  // Assigns regions of specified indices the currently selected color and update colorData accordingly, then run callback if any
  assignRegions(indices, callback = null) {
    const color = this.getColor();

    // Modifying the new data before setting it as the state
    let currentData = cloneDeep(this.state.scenarioData);
    let currentColorData = cloneDeep(this.state.colorData);
    let removedColors = [];
    let addedColor = false;

    indices.forEach(index => {
      const previousColor = currentData[this.state.activeEntry].regionDict[index].color;
      // Update for scenarioData the color of the region
      currentData[this.state.activeEntry].regionDict[index].color = color;

      // Only need to update if the previousColor is different from current color
      if (previousColor !== color) {
        // Deal with decrementing previous color's colorData entry, if any
        if (previousColor) {
          currentColorData[this.state.activeEntry][previousColor] -= 1;
          if (currentColorData[this.state.activeEntry][previousColor] === 0) {
            // If the assigning took the count of regions of the color to 0, then remove it from the colorData
            delete currentColorData[this.state.activeEntry][previousColor];
            removedColors.push(previousColor);
          }
        }

        // Deal with incrementing or creating entry for added color's colorData entry, if any
        if (color) {
          if (color in currentColorData[this.state.activeEntry]) {
            currentColorData[this.state.activeEntry][color] += 1;
          } else {
            currentColorData[this.state.activeEntry][color] = 1;
            addedColor = true;
          }
        }
      }
    });

    // Setting state, then do callback
    this.setState({ scenarioData: currentData, colorData: currentColorData },
      () => {
        this.mapRef.current.resetAllRegionStyle();
        if (callback) {
          callback();
        }

        // Running plugin methods
        Object.values(this.plugins).forEach(entry => {
          if (entry.functions.onAssignRegions) {
            entry.functions.onAssignRegions(this, indices, color, removedColors, addedColor);
          }
        });
      });
  }

  // Loads the specified save file containing scenarioData and pluginData, then sets current active entry to the first one, thereby resetting the region styling as well
  loadSave(saveData) {
    this.setState({ scenarioData: saveData.scenarioData, colorData: saveData.colorData, pluginData: saveData.pluginData }, () => { this.updateActiveEntry(0) });

    // Running plugin methods
    Object.values(this.plugins).forEach(entry => {
      if (entry.functions.onLoadSave) {
        entry.functions.onLoadSave(this, saveData);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <MenuComponent
          data={{
            scenarioData: this.state.scenarioData,
            colorData: this.state.colorData,
            pluginData: this.state.pluginData,
          }}
          loadSave={this.loadSave}
        />
        <ToolbarComponent lassoSelecting={this.state.lassoSelecting} updateLassoSelecting={this.updateLassoSelecting} erasing={this.state.erasing} updateErasing={this.updateErasing} />
        <PluginMenuComponent app={this} />
        <TimelineBarComponent
          updateActiveEntry={this.updateActiveEntry}
          activeEntry={this.state.activeEntry}
          scenarioData={this.state.scenarioData}
          addEntry={this.addEntry}
          themeDict={this.themeDict.other}
        />
        <TimelineEventComponent
          date={this.state.scenarioData[this.state.activeEntry].date}
          event={this.state.scenarioData[this.state.activeEntry].event}
          updateEventDate={this.updateEventDate}
          updateEvent={this.updateEvent}
          deleteEntry={this.deleteEntry}
          activeEntry={this.state.activeEntry}
          clearEntry={this.clearEntry}
          oneEntryLeft={this.state.scenarioData.length === 1}
          themeDict={this.themeDict.other}
        />
        <ColorBarComponent defaultColorBarColor={this.state.defaultColorBarColor} ref={this.colorBarRef} themeDict={this.themeDict.other} />
        <MapComponent
          themeDict={this.themeDict.other}
          baseMap={mapAdmin}
          assignRegions={this.assignRegions}
          regionDict={this.state.scenarioData[this.state.activeEntry].regionDict}
          lassoSelecting={this.state.lassoSelecting}
          updateLassoSelecting={this.updateLassoSelecting}
          processRegionHoveredOn={this.processRegionHoveredOn}
          processRegionHoveredOut={this.processRegionHoveredOut}
          ref={this.mapRef}
        />
      </div>
    );
  }
}

export default App;