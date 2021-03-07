// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

const transformDict = {
    "up": "rotate(0deg)",
    "down": "rotate(180deg)",
    "right": "rotate(90deg)",
    "left": "rotate(270deg)",
}

const useStyles = makeStyles((theme) => ({
    retractButton: {
        position: "absolute",
        width: 100,
        height: 10,
        backgroundColor: theme.palette.background.light,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginLeft: -50,
        marginTop: -5,
        visibility: "visible", // ensures even with say transformations where visibility is hidden after transforming, that the button is still visible
    }
}));

function RetractButton(props) {
    const classes = useStyles();
    const transform = transformDict[props.direction];
    const Icon = props.checked ? UpIcon : DownIcon;
    return (
        <div
            className={classes.retractButton}
            onClick={props.onClick}
            style={{
                transform: "scale(0.6)" + transform,
                top: props.top,
                left: props.left,
            }}
        >
            <Icon size="small"/>
        </div>
    );
}

export default RetractButton;