// Import packages
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    timelineMarker: {
        position: "absolute",
        top: 17,
        zIndex: 2,
        transform: "scale(0.8)",
        backgroundColor: theme.palette.background.default,
    },
    iconButton: {
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
    }
}));

export default function TimelineMarker(props) {
    const classes = useStyles();
    const icon = props.selected ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>;
    return (
        <div className={classes.timelineMarker} style={{left: (props.index+1)*props.themeDict.timelineMarkerSpacing}}>
            <Typography
                className={classes.markerLabel}
                variant="caption"
                style={{
                    width:props.themeDict.timelineMarkerLabelWidth,
                    marginLeft:-props.themeDict.timelineMarkerLabelWidth/2,
                }}
            >
            {props.label}
            </Typography>
            <IconButton className={classes.iconButton} size="small" onClick={() => {props.updateActiveEntry(props.index);}}>
                {icon}
            </IconButton>
        </div>
    );
}