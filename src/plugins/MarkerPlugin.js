import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';
import cloneDeep from "clone-deep";
import Typography from "@material-ui/core/Typography";

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
        zIndex: 3,
        height: 80,
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
    },
    iconList: {
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: 5,
    },
    iconListEntry: {
        height: 20,
        width: 20,
    },
    markerHelp: {
        width: "100%",
    }
}));

// Function to run when active entry is updated, this updates the markerData in the mapComponent, then reloads the markers
function onUpdateActiveEntry(app, newIndex) {
    app.mapRef.current.updateMarkerData();
}

function onAddEntry(app, index) {
    let currentMarkerData = cloneDeep(app.state.pluginData["Marker"]);
    let newMarkerEntry = null;
    if (index > 0) { // Use new
        newMarkerEntry = cloneDeep(currentMarkerData[index - 1]);
    } else { // Use default
        newMarkerEntry = {};
    }
    currentMarkerData.splice(index, 0, newMarkerEntry);
    return currentMarkerData;
}

function onDeleteEntry(app, index) {
    let currentMarkerData = cloneDeep(app.state.pluginData["Marker"]);
    currentMarkerData.splice(index, 1);
    return currentMarkerData;

}

// Icon selection component
function IconSelector(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const Icon = props.value;

    const iconChoices = markerIcons.map((MarkerIcon, index) => (
        <MarkerIcon
            key={index}
            className={classes.iconListEntry}
            style={{color:props.color}}
            onClick={() => {
                props.updateIconIndex(index);
                handleClick();
            }}
        />
    ));

    return (
        <div>
            <Icon className={classes.iconDisplay} style={{ color: props.color }} onClick={handleClick}/>
            <Popper className={classes.iconList} id={id} open={open} anchorEl={anchorEl} disablePortal>
                <Grid>
                    {iconChoices}
                </Grid>
            </Popper>
        </div>
    )
}

// Marker component
function MarkerPluginComponent(props) {
    const classes = useStyles();
    const [color, setColor] = React.useState("#bf4340");// Default color of icons
    const [iconIndex, setIconIndex] = React.useState(0);// Defaults to first icon in list

    const Icon = markerIcons[iconIndex];

    return (
        <div id="marker_panel" className={classes.markerContainer}>
            <Typography className={classes.markerHelp} align="left" variant="caption">Choose icon: click icon</Typography>
            <Typography className={classes.markerHelp} align="left" variant="caption">Choose color: click rectangle.</Typography>
            <Typography className={classes.markerHelp} align="left" variant="caption">Drag icon: click and hold.</Typography>
            <Typography className={classes.markerHelp} align="left" variant="caption">Remove icon or view/edit its tooltip: click icon on the map.</Typography>
            <div className={classes.iconSelect}>
                <IconSelector value={Icon} color={color} updateIconIndex={setIconIndex}/>
                <Input className={classes.iconColorInput} value={color} type="color" onChange={e => setColor(e.target.value)} />
            </div>
            <Button onClick={() => {
                const center = props.app.mapRef.current.mapElement.getBounds().getCenter();
                props.app.mapRef.current.addMarker(iconIndex, color, center.lat, center.lng, "This is editable.");
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
    help: "For adding colored markers to the map.",
    functions: {
        onUpdateActiveEntry: onUpdateActiveEntry,
        onAddEntry: onAddEntry,
        onDeleteEntry: onDeleteEntry,
    }
};

export default MarkerPluginDict;