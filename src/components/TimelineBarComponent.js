// Import packages
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

// Import custom components
import TimelineMarker from './TimelineMarker.js';

const useStyles = makeStyles((theme) => ({
    timelineBarContainer: {
        position: "absolute",
        width: "100%",
        height: 50,
        bottom: 0,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
    },
    timelineLine: {
        position: "absolute",
        top: 28,
        height: 2,
        width: 1000,
        backgroundColor: theme.palette.text.secondary,
    },
    timelineBarContentContainer: {
        display: "relative",
        height: "100%",
    },
    timelineBarMarkerContainer: {
        position: "absolute",
        top: 0,
        width: 1000,
    }
}));

export default function TimelineBarComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.timelineBarContainer}>
            <Scrollbars className={classes.timelineBarContentContainer}>
                <div className={classes.timelineBarContentContainer}>
                    <div className={classes.timelineLine}></div>
                    <div className={classes.timelineBarMarkerContainer}>
                        <TimelineMarker selected={true}></TimelineMarker>
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
}