// Import React and other modules
import React from "react";
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';

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
import mapAdmin from "./assets/basemap/mapAdmin.json"; // This is the only default map for the app

// Import scripts
import createRegionDict from './scripts/createRegionDict.js';
import createScenarioEntry from './scripts/createScenarioEntry.js';
import saveScenario from './scripts/saveScenario.js';

// Import plugins
import plugins from "./appPlugins.js";

// Import deep clone
import cloneDeep from "clone-deep";

// Import react-joyride
import ReactJoyride, { EVENTS } from 'react-joyride';
import steps from './assets/other/joyrideSteps.js';

// Import Google Analytics
import ReactGA from 'react-ga';

// Setup Google Analytics
ReactGA.initialize("UA-176706567-4");
ReactGA.pageview(window.location.pathname + window.location.search);

const theme = createMuiTheme(themeDict.material);

const useStyles = theme => ({
});

class App extends React.Component {
  constructor(props) {
    super(props);

    // Declare some constant attributes
    this.baseMap = mapAdmin;
    this.mapKey = "mapAdmin";
    this.themeDictDefault = themeDict;

    // Convert baseMap to a prototype, const dictionary indexed by regionID
    this.regionDictDefault = createRegionDict(this.baseMap);
    this.scenarioDataDefault = [
      createScenarioEntry(this.regionDictDefault, "2000 January 1", "An Event"), // Default is 2 entry with the default regionDict, empty date and event entry
      createScenarioEntry(this.regionDictDefault, "2010 January 1", "Another Event"),
    ];

    this.plugins = plugins;
    // Default values should ideally all be based off the scenarioDataDefault
    // Setup default state values
    let pluginData = {};
    for (const [name, entry] of Object.entries(this.plugins)) {
      pluginData[name] = entry.initState(this.scenarioDataDefault);
    }

    let colorData = [];
    let i;
    for (i = 0; i < this.scenarioDataDefault.length; i++) {
      colorData.push({});
    }

    // Set initial state
    this.state = {
      themeDict: this.themeDictDefault,
      scenarioData: this.scenarioDataDefault, // Array of information for the scenarios
      pluginData: pluginData, // Create object for data in plugin indexed by name of plugin
      colorData: colorData, // Dictionary with corresponding entries to scenarioData, that records the number of regions of specific color for the scenario timeline entry
      activeEntry: 0, // index of currently active on map entry in scenarioData
      lassoSelecting: false, // state for whether lasso select tool is activated
      erasing: false, // state for whether eraser tool is activated
      helpOn: true, // On opening app, defaults to have help on
      picking: false, // color picking tool defaults to not on
      mapKey: this.mapKey, // This is here both as a state and to act as a trigger for MapComponent and App overall to rerender upon loading in a new GeoJSON, it should only be modified by CustomGeoJSONLoaderPlugin
    };

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
    this.setColorBarColor = this.setColorBarColor.bind(this);
    this.processRegionHoveredOn = this.processRegionHoveredOn.bind(this);
    this.processRegionHoveredOut = this.processRegionHoveredOut.bind(this);
    this.save = this.save.bind(this);
    this.getRegionColorByIndex = this.getRegionColorByIndex.bind(this);
    this.updatePicking = this.updatePicking.bind(this);
    this.resetAppBasedOnBasemap = this.resetAppBasedOnBasemap.bind(this);
    this.runPluginFunc = this.runPluginFunc.bind(this)
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.updateMarkerData = this.updateMarkerData.bind(this);
    this.getMarkerData = this.getMarkerData.bind(this);
    this.initUndefinedPluginData = this.initUndefinedPluginData.bind(this);
  }

  // Returns pluginData for marker of current activeEntry
  getMarkerData() {
    return this.state.pluginData["Marker"][this.state.activeEntry];
  }

  // Updates pluginData for marker update of current activeEntry
  updateMarkerData(markerData) {
    let currentData = cloneDeep(this.state.pluginData["Marker"]);
    currentData[this.state.activeEntry] = markerData;
    this.updatePluginData("Marker", currentData);
  }

  // Runs functions entry in plugin of specified key, supplies the args to the function called in addition to the this argument
  runPluginFunc(key, args) {
    Object.values(this.plugins).forEach(entry => {
      if (key in entry.functions) {
        entry.functions[key](this, ...args);
      }
    });
  }

  // Resets app based on basemap, in particular the key states, including scenariodata, colorData, pluginData
  resetAppBasedOnBasemap(baseMap, mapKey, callback=null) {
    // This part is the same as from the app constructor TODO: try to alter so to promode code reuse
    this.baseMap = baseMap;
    this.mapKey = mapKey;
    // Some attributes for plugins to use
    // Convert baseMap to a prototype, const dictionary indexed by regionID
    this.regionDictDefault = createRegionDict(this.baseMap);
    this.scenarioDataDefault = [
      createScenarioEntry(this.regionDictDefault, "2000 January 1", "An Event"), // Default is 2 entry with the default regionDict, empty date and event entry
      createScenarioEntry(this.regionDictDefault, "2010 January 1", "Another Event"),
    ];

    this.plugins = plugins;
    // Default values should ideally all be based off the scenarioDataDefault
    // Setup default state values
    let pluginData = {};
    for (const [name, entry] of Object.entries(this.plugins)) {
      pluginData[name] = entry.initState(this.scenarioDataDefault);
    }

    let colorData = [];
    let i;
    for (i = 0; i < this.scenarioDataDefault.length; i++) {
      colorData.push({});
    }

    // This part is the same as the state setting, but here we use setState instead of directly setting, only difference is that helpOn here is not switched on as users would have seen it already
    this.setState({
      // Themedict is not reset to default, the existing themeDict settings will continue to be used
      scenarioData: this.scenarioDataDefault, 
      pluginData: pluginData, 
      colorData: colorData, 
      activeEntry: 0, 
      lassoSelecting: false, 
      erasing: false, 
      helpOn: false, // This is different from the initial initialization state value
      picking: false, 
      mapKey: this.mapKey, 
    }, () => {
      if (callback) {
        callback();
      }
    })
  }

  // Update color picker state
  updatePicking(newState, callback=null) {
    this.setState({ picking: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  processRegionHoveredOn(layer) {
    // Running plugin methods
    this.runPluginFunc("onProcessRegionHoveredOn", [layer]);
  }

  processRegionHoveredOut(layer) {
    // Running plugin methods
    this.runPluginFunc("onProcessRegionHoveredOut", [layer]);
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
  updateErasing(newState, callback=null) {
    this.setState({ erasing: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Returns hex of currently selected color, as in the colorBarComponent
  getColor() {
    return this.state.erasing ? null : this.colorBarRef.current.state.color;
  }

  // Sets color in colorBarComponent, expects a hex string
  setColorBarColor(color) {
    this.colorBarRef.current.setState({ color: color });
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
      newRegionDict = createScenarioEntry(this.regionDictDefault);
      newColorEntry = {};
    }
    currentData.splice(index, 0, newRegionDict);
    currentColorData.splice(index, 0, newColorEntry);
    this.setState({ scenarioData: currentData, colorData: currentColorData }, () => { this.updateActiveEntry(index); });

    // Running plugin methods
    this.runPluginFunc("onAddEntry", [index]);
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
    this.runPluginFunc("onDeleteEntry", [index]);
  }

  // Updates event date for active entry, expects a string argument
  updateEventDate(date) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].date = date;
    this.setState({ scenarioData: currentData });

    // Running plugin methods
    this.runPluginFunc("onUpdateEventDate", [date]);
  }

  // Updates event description for active entry, expects a string argument
  updateEvent(event) {
    let currentData = cloneDeep(this.state.scenarioData);
    currentData[this.state.activeEntry].event = event;
    this.setState({ scenarioData: currentData });

    // Running plugin methods
    this.runPluginFunc("onUpdateEvent", [event]);
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
        this.runPluginFunc("onUpdateActiveEntry", [newIndex]);
        if (callback) { // runs callback if callback is not null
          callback();
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
        this.mapRef.current.resetSpecifiedRegionStyle(indices);
        if (callback) {
          callback();
        }

        // Running plugin methods
        this.runPluginFunc("onAssignRegions", [indices, color, removedColors, addedColor]);
      });
  }

  // Saves the currently loaded scenario
  save() {
    saveScenario({
      scenarioData: this.state.scenarioData,
      colorData: this.state.colorData,
      pluginData: this.state.pluginData,
    });
  }

  // Filling undefined entries of pluginData to appropriate initialization states if necessary such that plugins may all function
  initUndefinedPluginData(callback=null) {
    let currentPluginData = cloneDeep(this.state.pluginData);
    let pluginData = {};
    for (const [name, entry] of Object.entries(this.plugins)) {
      if (!(name in currentPluginData)) {
        currentPluginData[name] = entry.initState(this.state.scenarioData);
      }
    }
    this.setState({pluginData:currentPluginData}, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Loads the specified save file containing scenarioData and pluginData, then sets current active entry to the first one, thereby resetting the region styling as well
  loadSave(saveData) {
    this.setState({ scenarioData: saveData.scenarioData, colorData: saveData.colorData, pluginData: saveData.pluginData }, () => {
      this.initUndefinedPluginData(() => this.updateActiveEntry(0));
    });

    // Running plugin methods
    this.runPluginFunc("onLoadSave", [saveData]);
  }

  getRegionColorByIndex(index) {
    // Return color hex, or null if that was the value
    return this.state.scenarioData[this.state.activeEntry].regionDict[index].color;
  }

  // Function for controlling Joyride
  handleJoyrideCallback(data) {
    const { type } = data;
    if (type === EVENTS.TOUR_END && this.state.helpOn) {
      this.setState({helpOn: false});
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <ReactJoyride
            callback={this.handleJoyrideCallback}
            steps={steps}
            continuous
            disableOverlayClose
            disableCloseOnEsc
            showProgress
            showSkipButton
            run={this.state.helpOn}
            styles={{
              buttonClose: {
                display:"none",
              },
              buttonSkip: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
                fontSize: 20,
              },
            }}
          />
          <MenuComponent
            save={this.save}
            loadSave={this.loadSave}
            openHelp={() => {this.setState({helpOn: true});}}
          />
          <ToolbarComponent
            lassoSelecting={this.state.lassoSelecting}
            updateLassoSelecting={this.updateLassoSelecting}
            erasing={this.state.erasing}
            updateErasing={this.updateErasing}
            picking={this.state.picking}
            updatePicking={this.updatePicking}
          />
          <PluginMenuComponent app={this} />
          <TimelineBarComponent
            updateActiveEntry={this.updateActiveEntry}
            activeEntry={this.state.activeEntry}
            scenarioData={this.state.scenarioData}
            addEntry={this.addEntry}
            themeDict={this.state.themeDict.other}
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
            themeDict={this.state.themeDict.other}
          />
          <ColorBarComponent ref={this.colorBarRef} themeDict={this.state.themeDict.other} />
          <MapComponent
            activeEntry={this.state.activeEntry}
            getRegionColorByIndex={this.getRegionColorByIndex}
            themeDict={this.state.themeDict.other}
            baseMap={this.baseMap}
            key={this.state.mapKey}
            assignRegions={this.assignRegions}
            lassoSelecting={this.state.lassoSelecting}
            updateLassoSelecting={this.updateLassoSelecting}
            processRegionHoveredOn={this.processRegionHoveredOn}
            processRegionHoveredOut={this.processRegionHoveredOut}
            updatePicking={this.updatePicking}
            picking={this.state.picking}
            setColorBarColor={this.setColorBarColor}
            updateMarkerData={this.updateMarkerData}
            getMarkerData={this.getMarkerData}
            ref={this.mapRef}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(App);