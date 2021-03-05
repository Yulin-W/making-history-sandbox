import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    helpContainer: {
        height: "90%",
        width: "80%",
        overflowY: "scroll",
    },
    helpContent: {
        margin: 5,
        color: theme.palette.text.primary,
    }
}));

function HelpComponent(props) {
    const classes = useStyles();
    return (
        <div className = { classes.helpContainer }>
            <h1 className={classes.helpContent}>Welcome to Making History Sandbox!</h1>
            <h3 className={classes.helpContent}>Click anywhere to return to app</h3>
            <p className={classes.helpContent}>This is an app aiming to make alternate history timeline creations easier. Features include a map with named regions that can be easily labelled, interactive timeline for adding/removing timepoints, pre-made scenarios and more.</p>
            <hr></hr>
            <h1 className={classes.helpContent}>If you made a historic scenario and is willing to share the save, you can send it to me at Yulin-W@outlook.com. If you want attribution, send the name you want as well.</h1>
            <hr></hr>
            <hr></hr>
            <h1 className={classes.helpContent}>**NEW FEATURE: Custom regions import, load and saving**</h1>
            <p className={classes.helpContent}>Many wanted this (me too), so here it is. </p>
            <p className={classes.helpContent}>Create basemap: Many external apps are available, I suggest <a href="https://geojson.io/">GeoJSON.io</a>. Use the polygon tool to draw the regions. For each region, give a regionID (from 0 onwards) and a name value. Then save the file as a geoJSON and you're good to go.</p>
            <p className={classes.helpContent}>Importing basemap: Import the created geoJSON via the geoJSON loader panel on the bottom of the right panel (scroll to bottom)</p>
            <p className={classes.helpContent}>Save and load your timeline with custom basemaps: Save as with a normal map, however on loading, use the geoJSON loader panel</p>
            <hr></hr>
            <hr></hr>
            <h1 className={classes.helpContent}>Help</h1>
            <h2 className={classes.helpContent}>Coloring and Labelling</h2>
            <p className={classes.helpContent}>Color/label region: use top panel, then click region to color. Use Legend panel on the right to modify label for regions of the color.</p>
            <p className={classes.helpContent}>Pick existing color: use pick button under color panel then click on a colored region or click on color in legend</p>
            <p className={classes.helpContent}>Mass labelling: click lasso under the color panel to activate lasso mode.</p>
            <p className={classes.helpContent}>Erase: click erase under the color panel, then either click on region or use lasso to mass unlabel.</p>
            <h2 className={classes.helpContent}>Adding/deleting entries</h2>
            <p className={classes.helpContent}>Delete: use delete button on the bottom right to delete current time point</p>
            <p className={classes.helpContent}>Add: use the small + on the timeline to add time points in the location. Added entry will inherit the previous entry</p>
            <h2 className={classes.helpContent}>Switching background</h2>
            <p className={classes.helpContent}>Use top right layers icon to choose the background map and whether regions should be displayed</p>
            <h2 className={classes.helpContent}>Alternate History Editor users</h2>
            <p className={classes.helpContent}>To load save: use the Alt Hist Editor Loader panel at the end of the right panel (scroll down if it isn't visible)</p>
            <h2 className={classes.helpContent}>For those that want to see code</h2>
            <a className={classes.helpContent} href="https://github.com/Yulin-W/making-history-sandbox">Github repository</a>
            <hr></hr>
            <h2 className={classes.helpContent}>Acknowledgements</h2>
            <p className={classes.helpContent}>"mapAdmin.json" (geojson basemap for the regions) was modified from: Natural Earth. Free vector and raster map data @ naturalearthdata.com.</p>
            <h4 className={classes.helpContent}>Community contributed scenarios: Thanks to the following members of the community for these scenarios:</h4>
            <p className={classes.helpContent}>2021 Modern Map, by DawnbreakZ</p>
        </div>
    );
}

export default React.memo(HelpComponent);