import React from 'react';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { BorderStyle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    altHistEditorLoaderContainer: {
        height: 120,
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        padding: 5,
    },
    loaderDropzone: {
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        height: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

}));

function AltHistEditorLoaderPluginComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.altHistEditorLoaderContainer}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={classes.loaderDropzone}>
                            <div>
                                Drop your save here, or click to select files
                            </div>
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    );
}

const initState = scenarioData => {
    return null;
};

const AltHistEditorLoaderPluginDict = {
    component: AltHistEditorLoaderPluginComponent,
    initState: initState,
    functions: {
        onAssignRegions: null,
        onAddEntry: null,
        onDeleteEntry: null,
        onUpdateActiveEntry: null,
        onUpdateEventDate: null,
        onUpdateEvent: null,
        onLoadSave: null,
        onProcessRegionHoveredOn: null,
        onProcessRegionHoveredOut: null,
    }
};

export default AltHistEditorLoaderPluginDict;