// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    eventContainer: {
        position: "absolute",
        left: 0,
        bottom: 48, // This value should be such that the event box touches the timeline bar on the bottom, so adjust accordingly
        minWidth: 240, // At least 250px adding in padding
        width: "15%",
        minHeight: 190, // At least 200px adding in padding
        height: "25%",
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
        height: 50,
        flexFlow: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundImage: theme.palette.backgroundImage.main
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
        margin: 10,
    }
}));

export default function TimelineEventComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.eventContainer}>
            <div className={classes.eventBar}>
                <TextField size="small" label="Date" margin="dense" value={props.date} onChange={e => {props.updateEventDate(e.target.value)}} className={classes.dateInput}></TextField>
                <Button variant="contained" size="large" color="primary" onClick={() => {props.clearEntry();}} className={classes.eventButton}>Clear</Button>
                <Button variant="contained" size="large" color="secondary" onClick={() => {props.deleteEntry(props.activeEntry);}} disabled={props.oneEntryLeft} className={classes.eventButton}>Delete</Button>
                {/*Delete button is disabled for the first entry TODO: because for now we haven't implemented the add entry before first element functionality yet, nor is there a button for it*/}
            </div>
            <textarea className={classes.eventContent} value={props.event} onChange={e => {props.updateEvent(e.target.value)}} multiline="true"></textarea>
        </div>
    );
}