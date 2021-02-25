import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

// This should be used both for loading saves made with custom geojsons and for loading a custom geojson
// To remove this plugin completely, technically just remove it from plugin list, but there is the mapKey attribute in the App.js which facilitates the plugin which I guess is needed for it to work well

// Setup styles
const useStyles = makeStyles((theme) => ({
    customGeoJSONLoaderContainer: {
        backgroundColor: theme.palette.background.paper,
        width: "calc(100% - 10px)", // This subtraction corresponds to the padding of the parent
        padding: 5,
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "flex-start",
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

// Function for loading such file
// Expects geoJSON either alone or part of a save to be of format, i.e. polygons have name, regionID attributes
function loadGeoJSON(app, file) {
    const name = file.name;
    file.text().then(text => {
        const obj = JSON.parse(text);
        console.log(obj);
        if ("scenarioData" in obj) {
            // This is used to test obj is a save, not a geoJSON
            //FIXME: Need to call the plugin data so map update first, then call save loading
        } else {
            // Assumes then the loaded file is geoJSON
            // Setup regions
            app.baseMap = obj;
            app.mapKey = "name";
            // Reset app based on these two updated values
            app.resetAppBasedOnBasemap();
        }
    });
}

// Load file 
function CustomGeoJSONLoaderPluginComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.customGeoJSONLoaderContainer}>
            <Dropzone
                onDrop={acceptedFiles => {
                    loadGeoJSON(props.app, acceptedFiles[0]);
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={classes.loaderDropzone}>
                            <div>
                                Drop your save here, or click to select file
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

const CustomGeoJSONLoaderPluginDict = {
    component: CustomGeoJSONLoaderPluginComponent,
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

export default CustomGeoJSONLoaderPluginDict;