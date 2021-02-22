// Import packages
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from "@material-ui/core/Typography";
import TimelineAddButton from './TimelineAddButton.js';

const useStyles = makeStyles((theme) => ({
    timelineMarker: {
        position: "absolute",
        top: 15,
        zIndex: 2,
        transform: "scale(0.8)",
        backgroundColor: theme.palette.background.default,
    },
    entryButton: {
        color: theme.palette.text.primary,
        padding: 0,
    },
    markerLabel: {
        position: "absolute",
        top: -20,
        left: "50%",
        textAlign: "center",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));

export default function TimelineMarker(props) {
    const classes = useStyles();
    const icon = props.selected ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>;
    return (
        <div className={classes.timelineMarker} style={{left: (props.index+1)*props.themeDict.timelineMarkerSpacing}}>
            {/*props.index+1 as we wish to add after the current entry*/}
            <Typography
                className={classes.markerLabel}
                variant="body2"
                style={{
                    width:props.themeDict.timelineMarkerLabelWidth,
                    marginLeft:-props.themeDict.timelineMarkerLabelWidth/2,
                }}
            >
            {props.label}
            </Typography>
            <TimelineAddButton themeDict={props.themeDict} addEntry={props.addEntry} index={props.index}/>
            <IconButton className={classes.entryButton} size="small" onClick={() => {props.updateActiveEntry(props.index);}}>
                {icon}
            </IconButton>
        </div>
    );
}