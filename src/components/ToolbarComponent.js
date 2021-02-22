// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 25,
        width: 150,
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        borderBottomLeftRadius: 50,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-end",
    }, toolbarButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        height:"100%",
    }
}));

// FIXME: make toolbar look like a toolbar, clearly different from the manu bar ideally; and I think in fact put the color related tools beside the color bar as they are relevant

export default function ToolbarComponent(props) {
        const classes = useStyles();
        const lassoButtonText = props.lassoSelecting ? "Cancel" : "Lasso"; // TODO: using switches might be better in these situations
        const lassoButtonColor = props.lassoSelecting ? "secondary" : "default";
        const eraserButtonText = props.erasing ? "Cancel" : "Eraser";
        const eraserButtonColor = props.erasing ? "secondary" : "default";
        return (
            <div className={classes.toolbarContainer}>
                <Button color={eraserButtonColor} className={classes.toolbarButton} onClick={() => {props.updateErasing(!props.erasing);}}>{eraserButtonText}</Button>
                <Button color={lassoButtonColor} className={classes.toolbarButton} onClick={() => {props.updateLassoSelecting(!props.lassoSelecting);}}>{lassoButtonText}</Button>
            </div>
        );
    }