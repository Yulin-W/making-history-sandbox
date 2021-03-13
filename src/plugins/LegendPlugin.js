import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Scrollbars from 'react-custom-scrollbars';
import cloneDeep from "clone-deep";
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    legendContainer: {
        height: 240,
        width: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-evenly"
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
        width: 80,
        fontSize: 10,
    },
    legendEntryNum: {
        marginLeft: 5,
        marginRight: 5,
        fontSize: 10,
    },
    legendGrid: {
        height: 180,
    },
    totalLabel: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(0.9)"
    },
    displayNumSwitch: {
        transform: "scale(0.6)",
    },
    displayNumSwitchContainer: {
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "flex-end",
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
                    props.setColorBarColor(props.color);
                }}
            />
            <InputBase
                className={classes.legendEntryLabel}
                value={props.label}
                onChange={props.onChange}
            />
            {props.displayNum && <Typography variant="caption" className={classes.legendEntryNum}>{props.num}</Typography>}
        </div>
    )
}

function LegendComponent(props) {
    const classes = useStyles();
    const [displayNum, setDisplayNum] = React.useState(true);
    const entries = Object.keys(props.app.state.pluginData["Legend"][props.app.state.activeEntry]).map((color) =>
        <LegendEntry
            key={color}
            color={color}
            label={props.app.state.pluginData["Legend"][props.app.state.activeEntry][color]}
            num={props.app.state.colorData[props.app.state.activeEntry][color]}
            displayNum={displayNum}
            item
            onChange={e => {
                let currentLegendData = cloneDeep(props.app.state.pluginData["Legend"]);
                currentLegendData[props.app.state.activeEntry][color] = e.target.value;
                props.app.updatePluginData("Legend", currentLegendData);
            }}
            setColorBarColor={props.app.setColorBarColor}
        />);
    return (
        <div className={classes.legendContainer}>
            <div className={classes.displayNumSwitchContainer}>
                <FormControlLabel
                    className={classes.displayNumSwitch}
                    control={<Switch checked={displayNum} onChange={() => setDisplayNum(!displayNum)} />}
                    label="Counts"
                    labelPlacement="start"
                />
            </div>
            <div className={classes.totalLabel}>
                <Typography variant="caption">Total Regions: {props.app.baseMap.features.length}</Typography>
            </div>
            <Scrollbars>
                <Grid container direction="column" justify="flex-start" wrap="wrap" className={classes.legendGrid}>
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
    console.log(1);
    let currentLegendData = cloneDeep(app.state.pluginData["Legend"]);
    let newLegendEntry = null;
    if (index > 0) { // Use new
        newLegendEntry = cloneDeep(currentLegendData[index - 1]);
    } else { // Use default
        newLegendEntry = {};
    }
    currentLegendData.splice(index, 0, newLegendEntry);
    return currentLegendData;
}

function onDeleteEntry(app, index) {
    let currentLegendData = cloneDeep(app.state.pluginData["Legend"]);
    currentLegendData.splice(index, 1);
    return currentLegendData;
}

// This dictionary contains the component, initial state value generation function for the plugin's entry in pluginData; this be based off the scenarioData state value
const LegendPluginDict = {
    component: LegendComponent,
    initState: initState,
    functions: {
        onAssignRegions: onAssignRegions,
        onAddEntry: onAddEntry, // Expects index argument
        onDeleteEntry: onDeleteEntry, // Expects index argument
    }
};

export default LegendPluginDict;