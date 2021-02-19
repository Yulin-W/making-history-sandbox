// Import packages
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const useStyles = makeStyles((theme) => ({
    timelineMarker: {
        position: "absolute",
        top: 14,
        left: 10,
        zIndex: 2,
        transform: "scale(0.8)",
        backgroundColor: theme.palette.background.default,
    },
}));

export default function TimelineMarker(props) {
    const classes = useStyles();
    const icon = props.selected ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/>;
    return (
        <div className={classes.timelineMarker}>
            <IconButton key={props.key} size="small">
                {icon}
            </IconButton>
        </div>
    );
}