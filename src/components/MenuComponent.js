import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import loadScenario from '../scripts/loadScenario.js';
import Dropzone from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    menuContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 25,
        width: 255,
        zIndex: 1,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-start",
        borderBottomStyle: "ridge",
        borderRightStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    menuButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        height: "100%",
    }
}));

export default function MenuComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.menuContainer} id="menu">
            <Button size="small" className={classes.menuButton} onClick={() => window.location.reload()}>New</Button>
            <Button size="small" className={classes.menuButton} onClick={props.save}>Save</Button>
            <Dropzone
                onDrop={acceptedFiles => {
                    loadScenario(acceptedFiles[0], props.loadSave);
                }}
            >
                {/*acceptedFiles[0] as we only care about a single file TODO: make some restriction to filetype (.json) to upload and number of files to upload (1 only)*/}
                {/*TODO: Here we used a drop zone, this might be an overkill to be honest as I only need a load button, so if performance drops too much or too much bandwidth taken, try to simplify this*/}
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button size="small" className={classes.menuButton}>Load</Button>
                        {/*This is a dummy button for visuals only, the uploading functionality is contained in the Dropzone and the input element*/}
                    </div>
                )}
                </Dropzone>
            <Button size="small" className={classes.menuButton} onClick={props.openHelp}>Help</Button>
        </div>
    );
}