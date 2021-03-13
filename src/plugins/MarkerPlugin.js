import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Setup styles
const useStyles = makeStyles((theme) => ({
    markerContainer: {
        backgroundColor: theme.palette.background.paper,
        width: "calc(100% - 10px)", // This subtraction corresponds to the padding of the parent
        padding: 5,
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
}));

// Load file 
function MarkerPluginComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.markerContainer}>
            Marker container placeholder
        </div>
    );
}

const initState = scenarioData => {
    return null;
};

const MarkerPluginDict = {
    component: MarkerPluginComponent,
    initState: initState,
    functions: {}
};

export default MarkerPluginDict;