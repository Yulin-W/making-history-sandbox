// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        position: "absolute",
        top: 96,
        right: "50%",
        marginRight: -148/2,
        height: 30,
        width: 130,
        zIndex: 1,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-end",
        borderBottomStyle: "ridge",
        borderLeftStyle: "ridge",
        borderRightStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    toolbarButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        height:"100%",
    }
}));

export default function ToolbarComponent(props) {
        const classes = useStyles();
        const lassoButtonText = props.lassoSelecting ? "Cancel" : "Lasso"; // TODO: using switches might be better in these situations
        const lassoButtonColor = props.lassoSelecting ? "secondary" : "default";
        const eraserButtonText = props.erasing ? "Cancel" : "Erase";
        const eraserButtonColor = props.erasing ? "secondary" : "default";
        return (
            <div className={classes.toolbarContainer} id="toolbar">
                <Button color={eraserButtonColor} className={classes.toolbarButton} onClick={() => {props.updateErasing(!props.erasing);}}>{eraserButtonText}</Button>
                <Button color={lassoButtonColor} className={classes.toolbarButton} onClick={() => {props.updateLassoSelecting(!props.lassoSelecting);}}>{lassoButtonText}</Button>
            </div>
        );
    }