import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import saveScenario from '../scripts/saveScenario.js';
import loadScenario from '../scripts/loadScenario.js';
import Dropzone from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    menuContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 25,
        width: 150,
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        borderBottomRightRadius: 50,
        display: "flex",
        flexFlow: "row",
        justifyContent: "flex-start",
    },
    menuButton: {
        fontSize: 12,
        margin: 0,
        padding: 0,
        height:"100%",
    }
}));

export default function MenuComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.menuContainer}>
            <Button size="small" className={classes.menuButton} onClick={() => { saveScenario(props.data); }}>Save</Button>
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
        </div>
    );
}