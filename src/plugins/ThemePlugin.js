import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import cloneDeep from 'clone-deep';

// Setup styles
const useStyles = makeStyles((theme) => ({
    themeContainer: {
        backgroundColor: theme.palette.background.paper,
        width: "calc(100% - 10px)", // This subtraction corresponds to the padding of the parent
        padding: 5,
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    themeInput: {
        transform: "scale(0.8)",
    }
}));

// Constant list of themeDict entries that are customizable
const custTheme = [
    "polyStrokeColor",
    "polyStrokeWeight",
    "polyFillColorDefault",
    "polyFillOpacityDefault",
    "polyFillOpacityColored",
    "polyFillOpacityHovered",
]

// Constant list of functions for ensuring type of values in theme input fields are read correctly
const custThemeType = {
    "polyStrokeColor": "text",
    "polyStrokeWeight": "number",
    "polyFillColorDefault": "text",
    "polyFillOpacityDefault": "number",
    "polyFillOpacityColored": "number",
    "polyFillOpacityHovered": "number",
};
const typeConvFunc = {
    "text": String,
    "number": Number,
};

// Load file 
function ThemePluginComponent(props) {
    const classes = useStyles();
    const [themeDict, setThemeDict] = React.useState(props.app.state.themeDict.other);
    const fields = Object.entries(themeDict).map(entry => {
        if (custTheme.includes(entry[0])) {
            return (<TextField
                className={classes.themeInput}
                key={entry[0]}
                value={entry[1]}
                label={entry[0]}
                margin="dense"
                type={custThemeType[entry[0]]}
                onChange={e => {
                    let newTheme = cloneDeep(themeDict);
                    newTheme[entry[0]] = typeConvFunc[custThemeType[entry[0]]](e.target.value);
                    setThemeDict(newTheme);
                }}
            />)
        }
    });
    return (
        <div className={classes.themeContainer}>
            {fields}
            <IconButton size="small" onClick={() => {
                let newTheme = cloneDeep(props.app.state.themeDict);
                newTheme.other = themeDict;
                props.app.setState({themeDict: newTheme}, () => {
                    props.app.mapRef.current.resetAllRegionStyle();
                });
            }}>
                <DoneIcon />
            </IconButton>
        </div>
    );
}

const initState = scenarioData => {
    return null;
};

const ThemePluginDict = {
    component: ThemePluginComponent,
    initState: initState,
    functions: {}
};

export default ThemePluginDict;