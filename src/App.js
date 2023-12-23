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
import PlayToolbarComponent from './components/PlayToolbarComponent.js';
import CondensedTimelineComponent from './components/CondensedTimelineComponent';

// Import default themeDict
import themeDict from './themes/default';

// Import default basemap geojson
import mapAdmin from "./assets/basemap/mapAdmin.json"; // This is the only default map for the app

// Import scripts
import createRegionDict from './scripts/createRegionDict.js';
import createScenarioEntry from './scripts/createScenarioEntry.js';
import saveScenario from './scripts/saveScenario.js';
import nextNumInList from './scripts/nextNumInList';

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
      createScenarioEntry(this.regionDictDefault, "2000 Jan 1", "An Event"), // Default is 2 entry with the default regionDict, empty date and event entry
      createScenarioEntry(this.regionDictDefault, "2010 Jan 1", "Another Event"),
    ];

    // Set initial state
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

    this.state = {
      themeDict: this.themeDictDefault,
      scenarioData: this.scenarioDataDefault, // Array of information for the scenarios
      pluginData: pluginData, // Create object for data in plugin indexed by name of plugin
      colorData: colorData, // Dictionary with corresponding entries to scenarioData, that records the number of regions of specific color for the scenario timeline entry
      activeEntry: 0, // index of currently active on map entry in scenarioData
      lassoSelecting: false, // state for whether lasso select tool is activated
      erasing: false, // state for whether eraser tool is activated
      same: false, // state for whether same tool is activated
      helpOn: true, // On opening app, defaults to have help on
      picking: false, // color picking tool defaults to not on
      mapKey: this.mapKey, // This is here both as a state and to act as a trigger for MapComponent and App overall to rerender upon loading in a new GeoJSON, it should only be modified by CustomGeoJSONLoaderPlugin
      playing: false, // defaults to not playing time line on opening app
      playSpeed: 1, // defaults to 1x play speed
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
    this.updateMultiPluginData = this.updateMultiPluginData.bind(this);
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
    this.updateSame = this.updateSame.bind(this);
    this.assignSameColor = this.assignSameColor.bind(this);
    this.getColorLabel = this.getColorLabel.bind(this);
    this.refreshColorBarInfo = this.refreshColorBarInfo.bind(this);
    this.updateLegendLabel = this.updateLegendLabel.bind(this);
    this.updatePlaying = this.updatePlaying.bind(this);
    this.playTimeline = this.playTimeline.bind(this);
    this.stopPlaying = this.stopPlaying.bind(this);
    this.changePlaySpeed = this.changePlaySpeed.bind(this);
    this.pausePlaying = this.pausePlaying.bind(this);
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

  // Runs functions entry in plugin of specified key, supplies the args to the function called in addition to the this argument, and also returns a list of the return values of the functions that did return values
  runPluginFunc(key, args) {
    let retval = {};
    Object.entries(this.plugins).forEach(entry => {
      if (key in entry[1].functions) {
        const val = entry[1].functions[key](this, ...args);
        if (val) {
          retval[entry[0]] = val;
        }
      }
    });
    return retval;
  }

  // Resets app based on basemap, in particular the key states, including scenariodata, colorData, pluginData
  resetAppBasedOnBasemap(baseMap, mapKey, callback = null) {
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
      same: false,
      helpOn: false, // This is different from the initial initialization state value
      picking: false,
      mapKey: this.mapKey,
      playing: false,
      playSpeed: 1,
    }, () => {
      this.refreshColorBarInfo(); // Refresh color bar so that correct legend label is displayed
      if (callback) {
        callback();
      }
    })
  }

  // Update color picker state
  updatePicking(newState, callback = null) {
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
  updatePluginData(key, data, callback = null) {
    let currentData = cloneDeep(this.state.pluginData);
    currentData[key] = data;
    this.setState({ pluginData: currentData }, () => {
      // Refresh color bar info if the updated pluginData is for legend so that correct legend labels are displayed
      if (key === "Legend") {
        this.refreshColorBarInfo();
      }
      if (callback) {
        callback();
      }
    });
  }

  // This is needed to prevent bugs occurring when multiple plugin data updates are called close to each other and resulting in state update not as fast as one would wish
  updateMultiPluginData(dataDict, callback = null) {
    let currentData = cloneDeep(this.state.pluginData);
    for (const [key, data] of Object.entries(dataDict)) {
      currentData[key] = data;
    }
    this.setState({ pluginData: currentData }, () => {
      // Refresh color bar info so that correct legend labels are displayed
      if ("Legend" in dataDict) {
        this.refreshColorBarInfo();
      }
      if (callback) {
        callback();
      }
    });
  }

  // Updates lasso selecting, expects true/false boolean value, then runs callback if any
  updateLassoSelecting(newState, callback = null) {
    this.setState({ lassoSelecting: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Update eraser state, such state in turn determines the value getColor returns
  updateErasing(newState, callback = null) {
    this.setState({ erasing: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Returns hex of currently selected color, as in the colorBarComponent; or null if erasing or erasing same mode is activated
  getColor() {
    if (this.state.erasing) { // This ensures that upon erase tool selected, clicking will erase label and color
      return null;
    } else {
      return this.colorBarRef.current.state.color;
    }
  }

  // Sets color in colorBarComponent, expects a hex string
  setColorBarColor(color) {
    this.colorBarRef.current.setState({ color: color, colorLabel: this.getColorLabel(color) });
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
    this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
      // Update the plugin data, then in call back update active entry to ensure order of execution
      const retval = this.runPluginFunc("onAddEntry", [index]);
      this.updateMultiPluginData(retval, () => { this.updateActiveEntry(index); });
    });
  }

  // Deletes entry in position at specified index in scenarioData and colorData
  // NB: this only works for deleting the index that is currently the active entry due to a bug (which isn't a problem right now because i recoded where it is called (specifically main location of concern is in the condensed timeline call; where upon calling not necessarily on the particular entry) to always ensure is at the active entry before calling this method); rip life then. TODO:
  // TODO: this part of code is highly repetitive and copy and pasted; pretty cooked 
  deleteEntry(index) {
    const currentData = cloneDeep(this.state.scenarioData);
    const currentColorData = cloneDeep(this.state.colorData);
    currentData.splice(index, 1);
    currentColorData.splice(index, 1);
    if ((index === this.state.activeEntry) && (index === this.state.scenarioData.length - 1)) {
      // Deleted entry is the current entry and the last entry
      // Hence we need to change entry to be focused on
      const newIndex = this.state.activeEntry - 1;
      // To avoid possibly access invalid active entry values, we update the activeEntry first, then update the scenarioDict to delete the entry
      this.updateActiveEntry(newIndex, () => {
        this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
          const retval = this.runPluginFunc("onDeleteEntry", [index]);
          this.updateMultiPluginData(retval);
        });
      }) // Note reset style is included in the updateActiveEntry function already
    } else if ((index !== this.state.activeEntry) && (index === this.state.scenarioData.length - 1)) {
      // Deleted entry is not the current entry and is the last entry
      // Just delete entry
      this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
        const retval = this.runPluginFunc("onDeleteEntry", [index]);
        this.updateMultiPluginData(retval, () => {
          this.mapRef.current.resetAllRegionStyle();
        });
      });
    } else if ((index === this.state.activeEntry) && (index !== this.state.scenarioData.length - 1)) {
      // Deleted entry is the current entry and not the last entry
      // Just delete entry; the index remains the same will automatically mean change to what was originally after the deleted event
      this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
        const retval = this.runPluginFunc("onDeleteEntry", [index]);
        this.updateMultiPluginData(retval, () => {
          this.mapRef.current.resetAllRegionStyle();
        });
      });
    } else {
      // Deleted entry is not the current entry and not the last entry
      // If the deleted entry is after the current entry then all good; but if index is before then need to shift index down to keep on the same event
      if (index > this.state.activeEntry) {
        // Deleted index after current index
        this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
          const retval = this.runPluginFunc("onDeleteEntry", [index]);
          this.updateMultiPluginData(retval, () => {
            this.mapRef.current.resetAllRegionStyle();
          });
        });
      } else if (index < this.state.activeEntry) {
        // Deleted index before current index
        const newIndex = this.state.activeEntry - 1;
        this.updateActiveEntry(newIndex, () => {
          this.setState({ scenarioData: currentData, colorData: currentColorData }, () => {
            const retval = this.runPluginFunc("onDeleteEntry", [index]);
            this.updateMultiPluginData(retval);
          });
        }) // Note reset style is included in the updateActiveEntry function already
      } else {
        // deleted entry is the current entry; this shouldn't happen for this case. So throw an error
        throw new Error("Delete entry is current entry despite this if/else cases is intended for situation where that is not true");
      }
    }

    // Running plugin methods
    // this.runPluginFunc("onDeleteEntry", [index]);
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
        document.getElementById("timeline_marker_" + newIndex).scrollIntoView({ block: 'nearest' });
        document.getElementById("table_row_" + newIndex).scrollIntoView({ block: 'nearest' });
        this.mapRef.current.resetAllRegionStyle();
        this.runPluginFunc("onUpdateActiveEntry", [newIndex]);
        this.refreshColorBarInfo(); // Refresh color bar so that correct legend label is displayed
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
        // Deal with decrementing previous color's colorData entry, if any (no color means region not labelled/colored)
        if (previousColor) {
          currentColorData[this.state.activeEntry][previousColor] -= 1;
          if (currentColorData[this.state.activeEntry][previousColor] === 0) {
            // If the assigning took the count of regions of the color to 0, then remove it from the colorData
            delete currentColorData[this.state.activeEntry][previousColor];
            removedColors.push(previousColor);
          }
        }

        // Deal with incrementing or creating entry for added color's colorData entry, if the color is not null (i.e. in erase mode)
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
  initUndefinedPluginData(callback = null) {
    let currentPluginData = cloneDeep(this.state.pluginData);
    for (const [name, entry] of Object.entries(this.plugins)) {
      if (!(name in currentPluginData)) {
        currentPluginData[name] = entry.initState(this.state.scenarioData);
      }
    }
    this.setState({ pluginData: currentPluginData }, () => {
      this.refreshColorBarInfo(); // Refresh color bar so that correct legend label is displayed
      if (callback) {
        callback();
      }
    });
  }

  // Loads the specified save file containing scenarioData and pluginData, then sets current active entry to the first one, thereby resetting the region styling as well
  loadSave(saveData) {
    // Note we run update active entry first to avoid issues of current active entry being undefined after loading save
    this.updateActiveEntry(0, () => {
      this.setState({ scenarioData: saveData.scenarioData, colorData: saveData.colorData, pluginData: saveData.pluginData }, () => {
        this.initUndefinedPluginData(() => this.updateActiveEntry(0));
      });
    })

    // Running plugin methods
    this.runPluginFunc("onLoadSave", [saveData]);
  }

  // Refreshes color bar info so that legend label displayed corresponds to legend
  refreshColorBarInfo() {
    if (this.colorBarRef.current) { // Only resets upon legend change given the app has been loaded and the colorBar is loaded up
      this.setColorBarColor(this.colorBarRef.current.state.color);
    }
  }

  getRegionColorByIndex(index) {
    // Return color hex, or null if that was the value
    return this.state.scenarioData[this.state.activeEntry].regionDict[index].color;
  }

  // Function for controlling Joyride
  handleJoyrideCallback(data) {
    const { type } = data;
    if (type === EVENTS.TOUR_END && this.state.helpOn) {
      this.setState({ helpOn: false });
    }
  }

  // Update same (button) state
  updateSame(newState, callback = null) {
    this.setState({ same: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Assign all regions with the specified color hex. Note if new color not already on map, then it will be assigned with a new default label as opposed to existing label
  assignSameColor(colorID) {
    // First find indices of regions with the specified colorID
    const currentEntryRegionDict = this.state.scenarioData[this.state.activeEntry].regionDict;
    let indices = [];
    for (const [regionID, regionData] of Object.entries(currentEntryRegionDict)) {
      if (regionData.color === colorID) {
        indices.push(regionID);
      }
    }

    // Now run assign region (which will either assign color or erase depending on if erase is also activated)
    this.assignRegions(indices);
  }

  // Returns label for the color if it is on the map, else return null
  getColorLabel(colorID) {
    if (colorID in this.state.pluginData["Legend"][this.state.activeEntry]) {
      return this.state.pluginData["Legend"][this.state.activeEntry][colorID];
    } else {
      return null;
    }
  }

  // Updates particular label in legend
  updateLegendLabel(color, label) {
    let currentLegendData = cloneDeep(this.state.pluginData["Legend"]);
    currentLegendData[this.state.activeEntry][color] = label;
    this.updatePluginData("Legend", currentLegendData);
  }

  // Updates status of playing
  updatePlaying(newState, callback = null) {
    this.setState({ playing: newState }, () => {
      if (callback) {
        callback();
      }
    });
  }

  // Plays timeline
  async playTimeline() {
    while (this.state.playing) {
      const newEntry = this.state.activeEntry + 1;
      if (newEntry === this.state.scenarioData.length) {
        // Stop playing if next entry is the beyond end of timeline, i.e. reached end of timeline already
        this.updatePlaying(false);
      } else {
        // Move to next entry
        this.updateActiveEntry(newEntry)
      }
      await new Promise(r => setTimeout(r, 2000 / this.state.playSpeed)); // base speed is 2s
    }
  }

  // Pauses playing timeline
  pausePlaying() {
    this.updatePlaying(false);
  }

  // Stops playing timeline and goes back to start
  stopPlaying() {
    this.updatePlaying(false, () => {
      this.updateActiveEntry(0)
    });
  }

  // Change timeline play speed
  changePlaySpeed() {
    const playSpeedArray = [1, 2, 4, 8, 16];
    const newSpeed = nextNumInList(this.state.playSpeed, playSpeedArray);
    this.setState({ playSpeed: newSpeed });
  }

  render() {
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
                display: "none",
              },
              buttonSkip: {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
                fontSize: 20,
              },
            }}
          />
          <MenuComponent
            app={this}
            // TODO: passing this is a very bad practice; try to circumvent
            save={this.save}
            loadSave={this.loadSave}
            openHelp={() => { this.setState({ helpOn: true }); }}
          />
          <ToolbarComponent
            lassoSelecting={this.state.lassoSelecting}
            updateLassoSelecting={this.updateLassoSelecting}
            erasing={this.state.erasing}
            updateErasing={this.updateErasing}
            picking={this.state.picking}
            updatePicking={this.updatePicking}
            updateSame={this.updateSame}
            same={this.state.same}
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
          <CondensedTimelineComponent
            themeDict={this.state.themeDict.other}
            scenarioData={this.state.scenarioData}
            activeEntry={this.state.activeEntry}
            updateActiveEntry={this.updateActiveEntry}
            addEntry={this.addEntry}
            deleteEntry={this.deleteEntry}
            oneEntryLeft={this.state.scenarioData.length === 1}
          />
          <PlayToolbarComponent
            playing={this.state.playing}
            updatePlaying={this.updatePlaying}
            playTimeline={this.playTimeline}
            pausePlaying={this.pausePlaying}
            stopPlaying={this.stopPlaying}
            playSpeed={this.state.playSpeed}
            changePlaySpeed={this.changePlaySpeed}
            themeDict={this.state.themeDict.other}
          />
          <ColorBarComponent
            ref={this.colorBarRef}
            themeDict={this.state.themeDict.other}
            getColorLabel={this.getColorLabel}
            updateLegendLabel={this.updateLegendLabel}
          />
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
            same={this.state.same}
            assignSameColor={this.assignSameColor}
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