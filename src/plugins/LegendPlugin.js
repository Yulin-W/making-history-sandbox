import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Scrollbars from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';
import cloneDeep from "clone-deep";

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
        width: 15,
        height: 15,
        margin: 5,
    },
    legendEntryLabel: {

    }
}));

function LegendEntry(props) {
    const classes = useStyles();
    return (
        <div className={classes.legendEntry}>
            <div style={{ backgroundColor: props.color }} className={classes.legendEntryColor}></div>
            <Typography variant="caption" className={classes.legendEntryLabel}>{props.label}</Typography>
        </div>
    )
}

function LegendComponent(props) {
    const classes = useStyles();

    // Modify


    const entries = Object.keys(props.app.state.colorData[props.app.state.activeEntry]).map(color => <LegendEntry color={color} label={"default label"} />);
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
    console.log(currentLegendData);
    app.updatePluginData("Legend", currentLegendData);
}

// This dictionary contains the component, initial state value generation function for the plugin's entry in pluginData; this be based off the scenarioData state value
const LegendPluginDict = {
    component: LegendComponent,
    initState: initState, // Expects a scenarioData argument (should be the default one for initialization)
    // Below are functions to be called as part of App.js's corresponding methods, they expected to have this (of App) binded to them, and so code for them can be written accordingly
    // The arguments they expect should be the app (as in this of the app component) + the same as the corresponding arguments in App, except for the callback TODO: this is quite a dangerous practice to give reference to top element to plugin, but it is quite useful, so going to do this for now (meaning probably not gunna change)
    // The functions should not rely on the completion of the associated methods, it should only depend on the state of the app prior to running the method
    functions: { // Note adding more functions than ones below would require adding in the run plugin function codes in the respective method of App
        onAssignRegions: null,
        onAddEntry: onAddEntry, // Expects index argument
        onDeleteEntry: onDeleteEntry, // Expects index argument
        onUpdateActiveEntry: null,
        onUpdateEventDate: null,
        onUpdateEvent: null,
        onLoadSave: null,
    }
};

export default LegendPluginDict;