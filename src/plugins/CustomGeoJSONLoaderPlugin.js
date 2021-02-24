import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

// This should be used both for loading saves made with custom geojsons and for loading a custom geojson

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
    file.text().then(text => {
        const obj = JSON.parse(text);
        console.log(obj);
        if ("scenarioData" in obj) {
            // This is used to test obj is a save, not a geoJSON
        } else {
            // Assumes then the loaded file is geoJSON

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