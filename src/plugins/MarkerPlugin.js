import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';

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
}));

// Function to run when active entry is updated, this updates the markerData in the mapComponent, then reloads the markers
function onUpdateActiveEntry(app, newIndex) {
    app.mapRef.current.updateMarkerData();
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
        <div className={classes.markerContainer}>
            <div className={classes.iconSelect}>
                <IconSelector value={Icon} color={color} updateIconIndex={setIconIndex}/>
                <Input className={classes.iconColorInput} value={color} type="color" onChange={e => setColor(e.target.value)} />
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
    functions: {
        onUpdateActiveEntry: onUpdateActiveEntry,
    }
};

export default MarkerPluginDict;