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

function removeGeoJSONFeatureUnusedProperties(featureProperties) {
    // Filters all attributes of GeoJSON Feature object's properties to include only those used by the app (so to reduce lag)
    // This filtering is in place, i.e. modifies the given object as opposed to returning filtered version
    const allowedKeys = ["name", "regionID"];

    for (const key in featureProperties) {
        if (!allowedKeys.includes(key)) {
            delete featureProperties[key];
        }
    }
}

function getCompatibleGeoJSON(rawObj) {
    // Convert geojson map or map in save to compatible format (i.e. polygons have name, regionID attribute) if doesn't exist already
    const obj = JSON.parse(JSON.stringify(rawObj)); // Makes a copy of the original file

    // Obtain the geoJSON map object
    let mapObj = obj;
    if ("scenarioData" in obj) {
        // File is a save, not just a GeoJSON alone
        mapObj = obj.pluginData["Custom GeoJSON Loader"].baseMap
    }

    // Construct new compatible geoJSON map
    mapObj.features.forEach((feature, index) => {
        feature.properties['regionID'] = index; // regardless of whether already has regionID, resetting it for consistency
        if (!('name' in feature.properties)) {
            if ('Name' in feature.properties) {
                feature.properties['name'] = feature.properties['Name'];
            } else if ('NAME' in feature.properties) {
                feature.properties['name'] = feature.properties['NAME'];
            } else if ('shapeName' in feature.properties) {
                feature.properties['name'] = feature.properties['shapeName'];

            } else {
                feature.properties['name'] = `Region ${index}`;
            }
        }
        removeGeoJSONFeatureUnusedProperties(feature.properties)
    });

    return obj;
}

// Function for loading such file
// Expects geoJSON either alone or part of a save to only have polygons
export function loadGeoJSON(app, file) {
    const name = file.name;
    file.text().then(text => {
        const rawObj = JSON.parse(text);

        // Convert geojson map or map in save to compatible format (i.e. polygons have name, regionID attribute) if doesn't exist already
        const obj = getCompatibleGeoJSON(rawObj);

        // Load the file into the map 
        if ("scenarioData" in obj) {
            // This is used to test obj is a save, not a geoJSON
            // Expects the file to have valid data, i.e. pluginData for GeoJSON loader and appropriate scenario data, colorDict, etc.
            // First load in the basemap and map key
            app.resetAppBasedOnBasemap(obj.pluginData["Custom GeoJSON Loader"].baseMap, obj.pluginData["Custom GeoJSON Loader"].mapKey, () => {
                app.updatePluginData("Custom GeoJSON Loader", {
                    mapKey: name,
                    baseMap: obj, // TODO: could be optimised so to instead of saving inmemeory two copies of such basemap, just save 1 copy, and say pass an argyument to resetAppBasedOnBasemap
                })
            });
            // Then load save as usual
            app.loadSave(obj);
        } else {
            // Assumes then the loaded file is geoJSON
            // Reset app based on these two updated values, baseMap and mapKey, then run callupdate to update the relevant pluginData, both mapKey and geoJSON map to record the data of the map there so saves will work
            app.resetAppBasedOnBasemap(obj, name, () => {
                app.updatePluginData("Custom GeoJSON Loader", {
                    mapKey: name,
                    baseMap: obj, // TODO: could be optimised so to instead of saving inmemeory two copies of such basemap, just save 1 copy, and say pass an argyument to resetAppBasedOnBasemap
                })
            });
        }
    });
}

// Load file 
function CustomGeoJSONLoaderPluginComponent(props) {
    const classes = useStyles();
    return (
        <div id="geojson_loader" className={classes.customGeoJSONLoaderContainer}>
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
    help: "For loading custom region geoJSON or saves with custom regions. Can also use top left LOAD button. See help for tutorial.",
    functions: {}
};

export default CustomGeoJSONLoaderPluginDict;