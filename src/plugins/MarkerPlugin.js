import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

// Import icons
import markerIcons from "../assets/other/markerIcons.js";

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
    iconSelect: {
        height: 50,
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
    },
    iconDisplay: {
        height: 30,
        width: 30,
    },
    iconColorInput: {
        width: 40,
        height: 40,
    }
}));

// Load file 
function MarkerPluginComponent(props) {
    const classes = useStyles();
    const [color, setColor] = React.useState("#bf4340");// Default color of icons
    const [iconIndex, setIconIndex] = React.useState(0);// Defaults to first icon in list

    const Icon = markerIcons[iconIndex];
    
    return (
        <div className={classes.markerContainer}>
            <div className={classes.iconSelect}>
                <Icon className={classes.iconDisplay} style={{color:color}}/>
                <Input className={classes.iconColorInput} value={color} type="color" onChange={e => setColor(e.target.value)}/>
            </div>
            <Button onClick={() => {
                const center = props.app.mapRef.current.mapElement.getBounds().getCenter();
                props.app.mapRef.current.addMarker(Icon, color, center.lat, center.lng);
            }}>
                Add
            </Button>
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