import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Scrollbars from 'react-custom-scrollbars';
import cloneDeep from "clone-deep";
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    legendContainer: {
        height: 200,
        width: "100%",
    },
    legendEntry: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    legendEntryColor: {
        width: 12,
        height: 12,
        margin: 5,
    },
    legendEntryLabel: {

    }
}));

function LegendEntry(props) {
    const classes = useStyles();
    return (
        <div className={classes.legendEntry}>
            <div
                style={{ backgroundColor: props.color }}
                className={classes.legendEntryColor}
                onClick={() => {
                    props.setDefaultColorBarColor(props.color);
                }}
            />
            <InputBase
                className={classes.legendEntryLabel}
                value={props.label}
                onChange={props.onChange}
            />
        </div>
    )
}

function LegendComponent(props) {
    const classes = useStyles();
    const entries = Object.keys(props.app.state.pluginData["Legend"][props.app.state.activeEntry]).map((color) =>
        <LegendEntry
            key={color}
            color={color}
            label={props.app.state.pluginData["Legend"][props.app.state.activeEntry][color]}
            item
            onChange={e => {
                let currentLegendData = cloneDeep(props.app.state.pluginData["Legend"]);
                currentLegendData[props.app.state.activeEntry][color] = e.target.value;
                props.app.updatePluginData("Legend", currentLegendData);
            }}
            setDefaultColorBarColor={props.app.setDefaultColorBarColor}
        />);
    return (
        <div className={classes.legendContainer}>
            <Scrollbars>
                <Grid container direction="column" justify="flex-start" wrap="wrap">
                    {entries}
                </Grid>
            </Scrollbars>
        </div>
    );
}

const initState = scenarioData => {
    let retval = [];
    let i;
    for (i = 0; i < scenarioData.length; i++) {
        retval.push({});
    }
    return retval;
};

// Adds color-label key value pair to pluginData entry for level of corresponding activeEntry if color was added for the first time, or delete the entry if no region has the color after the assigning
function onAssignRegions(app, indices, color, removedColors, addedColor) {
    let currentLegendData = cloneDeep(app.state.pluginData["Legend"]);
    if (addedColor) {
        currentLegendData[app.state.activeEntry][color] = "Label";
    }
    removedColors.forEach(color => {
        delete currentLegendData[app.state.activeEntry][color];
    });
    app.updatePluginData("Legend", currentLegendData);
}

function onAddEntry(app, index) {
    let currentLegendData = cloneDeep(app.state.pluginData["Legend"]);
    let newLegendEntry = null;
    if (index > 0) { // Use new
        newLegendEntry = cloneDeep(currentLegendData[index - 1]);
    } else { // Use default
        newLegendEntry = {};
    }
    currentLegendData.splice(index, 0, newLegendEntry);
    app.updatePluginData("Legend", currentLegendData);
}

function onDeleteEntry(app, index) {
    let currentLegendData = cloneDeep(app.state.pluginData["Legend"]);
    currentLegendData.splice(index, 1);
    app.updatePluginData("Legend", currentLegendData);
}

// This dictionary contains the component, initial state value generation function for the plugin's entry in pluginData; this be based off the scenarioData state value
const LegendPluginDict = {
    component: LegendComponent,
    initState: initState, // Given the value of scenarioData (assumed to be the scenarioDataDefault), the plugin should be able to work out its initial pluginData value
    // Below are functions to be called as part of App.js's corresponding methods, they expected to have this (of App) binded to them, and so code for them can be written accordingly
    // The arguments they expect should be the app (as in this of the app component) + the same as the corresponding arguments in App, except for the callback TODO: this is quite a dangerous practice to give reference to top element to plugin, but it is quite useful, so going to do this for now (meaning probably not gunna change)
    // For certain methods, other arguments are provided to improve performance and code reuse, check app.js for details
    // The functions should not rely on the completion of the associated methods, it should only depend on the state of the app prior to running the method
    // This is, except onAssignRegions, which I've set to have to run as a callback after the app's setting is complete
    functions: { // Note adding more functions than ones below would require adding in the run plugin function codes in the respective method of App
        onAssignRegions: onAssignRegions,
        onAddEntry: onAddEntry, // Expects index argument
        onDeleteEntry: onDeleteEntry, // Expects index argument
        onUpdateActiveEntry: null,
        onUpdateEventDate: null,
        onUpdateEvent: null,
        onLoadSave: null,
        onProcessRegionHoveredOn: null,
        onProcessRegionHoveredOut: null,
    }
};

export default LegendPluginDict;