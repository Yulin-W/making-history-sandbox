import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from "clone-deep";
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    statisticsContainer: {
        height: 200,
        width: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-evenly"
    },
}));

function StatisticsComponent(props) {
    const classes = useStyles();
    // FIXME: use a material UI table or something similar IMO
    return (
        <div id="statistics" className={classes.statisticsContainer}>
            <div>Land Area</div>
            <div>Population</div>
            <div>Population Density</div>
            <div>GDP</div>
            <div>GDP per cap</div>
        </div>
    );
}

const initState = scenarioData => {
  return null;
};

// This dictionary contains the component, initial state value generation function for the plugin's entry in pluginData; this be based off the scenarioData state value
const StatisticsPluginDict = {
    component: StatisticsComponent,
    initState: initState,
    help: "Summary statistics for selected regions \n Select color by picking it on the map or clicking the color box in the legend", // TODO: change this to specify date for which data is valid; e.g. 2020 depending on source
    functions: {}
};

export default StatisticsPluginDict;