// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

// Import custom components
import TimelineBarComponent from './TimelineBarComponent.js';
import TimelineEventComponent from './TimelineEventComponent.js';

const useStyles = makeStyles((theme) => ({
    timelineComponent: {
        zIndex: 1,
    }
}));

export default function TimelineComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.timelineComponent}>
            <TimelineBarComponent
                updateActiveEntry={props.updateActiveEntry}
                activeEntry={props.activeEntry}
                scenarioData={props.scenarioData}
                addEntry={props.addEntry}
                themeDict={props.themeDict}
            />
            <TimelineEventComponent
                date={props.scenarioData[props.activeEntry].date}
                event={props.scenarioData[props.activeEntry].event}
                updateEventDate={props.updateEventDate}
                updateEvent={props.updateEvent}
                deleteEntry={props.deleteEntry}
                activeEntry={props.activeEntry}
                clearEntry={props.clearEntry}
                themeDict={props.themeDict}
            />
        </div>
    );
}