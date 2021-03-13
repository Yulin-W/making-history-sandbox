import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Import icons
import { GiWarAxe } from 'react-icons/gi';

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
    // #Rremove 5the data check button FIXME:
    return (
        <div className={classes.markerContainer}>
            <Button onClick={() => 
                props.app.mapRef.current.addMarker(GiWarAxe, "#FF0000")
            }>Add Marker</Button>
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

const MarkerPluginDict = {
    component: MarkerPluginComponent,
    initState: initState,
    functions: {}
};

export default MarkerPluginDict;