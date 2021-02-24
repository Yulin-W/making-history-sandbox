import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    helpContainer: {
        width: "80%"
    },
    helpContent: {
        margin: 5,
    }
}));

function HelpComponent(props) {
    const classes = useStyles();
    return (
        <Grid className = { classes.helpContainer } container direction = "column" justify = "center" alignItems = "flex-start">
            <h1 className={classes.helpContent}>Welcome to Making History Sandbox!</h1>
            <h3 className={classes.helpContent}>Click anywhere to return to app</h3>
            <p className={classes.helpContent}>This is an app aiming to make alternate history timeline creations easier. Features include a map with named regions that can be easily labelled, interactive timeline for adding/removing timepoints, pre-made scenarios and more.</p>
            <h2 className={classes.helpContent}>Coloring and Labelling</h2>
            <p className={classes.helpContent}>Color/label region: use top panel, then click region to color. Use Legend panel on the right to modify label for regions of the color.</p>
            <p className={classes.helpContent}>Pick existing color: use pick button under color panel or click on color in legend</p>
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
        </Grid>
    );
}

export default React.memo(HelpComponent);