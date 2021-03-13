// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Slide from '@material-ui/core/Slide';

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    eventContainer: {
        position: "absolute",
        left: 0,
        bottom: 48, // This value should be such that the event box touches the timeline bar on the bottom, so adjust accordingly
        minWidth: 140, // At least 150px adding in padding
        width: "20%",
        minHeight: 190, // At least 200px adding in padding
        height: "30%",
        zIndex: 1,
        display: "flex",
        flexFlow: "column",
        alignItems: "stretch",
        padding: 5,
        borderRightStyle: "ridge",
        borderTopStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    eventBar: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundImage: theme.palette.backgroundImage.main
    },
    eventButtonHolder: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    eventContent: {
        marginTop: 5,
        flexGrow: 1,
        resize: "none",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    },
    eventButton: {
        fontSize: 10,
        margin: 2,
    },
    dateInput: {
        width: "max(calc(100% - 40px),)",
        margin: 10,
    }
}));

function TimelineEventComponent(props) {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(true);
    return (
        <Slide direction="right" in={display} unmountOnExit={false} mountOnEnter={false}>
            <div className={classes.eventContainer} id="timeline_event">
                <div className={classes.eventBar}>
                    <TextField size="small" label="Date" margin="dense" value={props.date} onChange={e => { props.updateEventDate(e.target.value) }} className={classes.dateInput}></TextField>
                    <div className={classes.eventButtonHolder}>
                        <Button variant="contained" size="small" color="primary" onClick={() => { props.clearEntry(); }} className={classes.eventButton}>Clear</Button>
                        <Button variant="contained" size="small" color="secondary" onClick={() => { props.deleteEntry(props.activeEntry); }} disabled={props.oneEntryLeft} className={classes.eventButton}>Delete</Button>
                        {/*Delete button is disabled for the first entry TODO: because for now we haven't implemented the add entry before first element functionality yet, nor is there a button for it*/}
                    </div>
                </div>
                <textarea className={classes.eventContent} value={props.event} onChange={e => { props.updateEvent(e.target.value) }} multiline="true"></textarea>
                <RetractButton direction="left" top={"50%"} left={"calc(100% + 6px)"} checked={display} onClick={() => setDisplay(!display)} />
            </div>
        </Slide>
    );
}

export default React.memo(TimelineEventComponent);