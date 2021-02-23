import React from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import createScenarioEntry from '../scripts/createScenarioEntry.js';
import cloneDeep from 'clone-deep';
import csscolors from 'css-color-names';

const useStyles = makeStyles((theme) => ({
    altHistEditorLoaderContainer: {
        height: 120,
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        padding: 5,
    },
    loaderDropzone: {
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

}));

// Class used for converting the alternate history editor save to the most recent save version in that app
// This file aims to ensure back-ward compatibility of save files
// Right now im doing a graduated thing of converting 1.0 to 1.1 and 1.1 to 1.2 and so on via functions for each, maybe it gets bad later but it'll be easy to refactor I assume so should be fine
class Loader { // Class which loads saves into the app, converting them regardless of version to the current version
    constructor() {
        this.currentSaveVersion = "1.2";
    }

    processSave(save) { // takes json parsed object file from menubar and converts it to the newest version
        let version = this.detectSaveVersion(save);

        if (version === "1.0") {
            return this.processSave(this.one_zero_to_one_one(save));
        } else if (version == "1.1") {
            return this.one_one_to_one_two(save);
        } else if (version == this.currentSaveVersion) { // no modification needed
            return save;
        }
    }

    one_one_to_one_two(save) { // converts 1.1 ver save to 1.2 ver save TODO: slight concerns as maybe pass by reference not value;
        save.version = this.currentSaveVersion;
        save.customMap = false; // 1.1 version saves didn't have non-inbuilt custom maps
        save.customMapGeojson = false; // same reason as above
        return save;
    }

    one_zero_to_one_one(save) { // converts 1.0 ver save to 1.1 ver save TODO: slight concerns as maybe pass by reference not value
        save.version = "1.1";
        let order = 0;
        Object.values(save.entryDict).forEach(entry => {
            // Assigns order based on current order of entryDict (which is insertion order I think if I remembered correction for such string keys)
            entry["order"] = order;
            order++;
        });
        return save;
    }

    detectSaveVersion(save) { // detects save version from
        if ("version" in save) { // case of versions from 1.1 onwards which has
            return save.version;
        } else { // case of version 1.0, as it didn't have a version attribute
            return "1.0";
        }
    }
}

// Instance of the Loader class
const loader = new Loader();

// Converts alternate history editor saves to the format appropriate for this this app
// Expects a single file object, one that is compatible with JSON.stringify after processing
// Returns the JSON object
function loadScenario(app, file, onload = null) {
    file.text().then(text => {
        const obj = loader.processSave(JSON.parse(text));
        if (obj.mapType === "admin") {
            let convertedObj = {
                scenarioData: [],
                colorData: [],
                pluginData: {},
            };
            // Generate scenarioData
            Object.values(obj.entryDict).forEach(entry => {
                let regionDict = cloneDeep(app.regionDictDefault);
                for (const [index, color] of Object.entries(entry.mapData)) {
                    if (!(index === "undefined")) { // We use string "undefined" for that seems to be what the json loading gives from the saves
                        regionDict[index].color = csscolors[color];
                    }
                }
                convertedObj.scenarioData.push(createScenarioEntry(regionDict, entry.date, entry.event));
            });

            // Generate colorData (due to known issues with the alternate history editor's count of colors, we shall count colors from mapData directly as opposed to using legendData in the save)
            // Color string dict is here for a mapping from hex to string for later on when we wish to use refer to color tags in the save (which are in the form of a string) via hex codes in the generated colorDict
            let colorStringDict = {};
            Object.values(obj.entryDict).forEach(entry => {
                let colorEntry = {};
                for (const [index, color] of Object.entries(entry.mapData)) {
                    if (!(index === "undefined")) { // We use string "undefined" for that seems to be what the json loading gives from the saves
                        if (csscolors[color] in colorEntry) {
                            colorEntry[csscolors[color]] += 1;
                        } else {
                            colorEntry[csscolors[color]] = 1;
                        }

                        // Update colorStringDict if the color concerned isn't in there already
                        if (!(color in colorStringDict)) {
                            colorStringDict[csscolors[color]] = color;
                        }
                    }
                }
                convertedObj.colorData.push(colorEntry);;
            });

            // Generate pluginData
            // Initialise pluginData first
            let pluginData = {};
            for (const [name, entry] of Object.entries(app.plugins)) {
                pluginData[name] = entry.initState(app.scenarioDataDefault);
            };
            // Modify pluginData entries (in comparison to the scenarioDataDefault case) that need to be changed according to our save, in this case at the time of writing only legend need to have its data modified
            // Generate Legend data
            pluginData["Legend"] = [];
            Object.values(obj.entryDict).forEach((entry, index) => {
                // Note this index is note the same as those in obj, in obj the index starts from 1, here it starts from 0
                let legendEntry = {};
                for (const color of Object.keys(convertedObj.colorData[index])) {
                    if (colorStringDict[color] in entry.legendData) {
                        legendEntry[color] = entry.legendData[colorStringDict[color]].entry;
                    } else {
                        legendEntry[color] = "None";
                    }
                }
                pluginData["Legend"].push(legendEntry);
            });
            convertedObj.pluginData = pluginData;

            // Load converted save
            if (onload) {
                onload(convertedObj);
            }

        } else {
            console.log("Error: currently only supports importing admin map saves")
        }
    });
}

function AltHistEditorLoaderPluginComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.altHistEditorLoaderContainer}>
            <Dropzone
                onDrop={acceptedFiles => {
                    loadScenario(props.app, acceptedFiles[0], props.app.loadSave);
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={classes.loaderDropzone}>
                            <div>
                                Drop your save here, or click to select files
                            </div>
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    );
}

const initState = scenarioData => {
    return null;
};

const AltHistEditorLoaderPluginDict = {
    component: AltHistEditorLoaderPluginComponent,
    initState: initState,
    functions: {
        onAssignRegions: null,
        onAddEntry: null,
        onDeleteEntry: null,
        onUpdateActiveEntry: null,
        onUpdateEventDate: null,
        onUpdateEvent: null,
        onLoadSave: null,
        onProcessRegionHoveredOn: null,
        onProcessRegionHoveredOut: null,
    }
};

export default AltHistEditorLoaderPluginDict;