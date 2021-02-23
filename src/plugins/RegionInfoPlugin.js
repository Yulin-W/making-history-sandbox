import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    regionInfoContainer: {
        width: "100%",
        paddingLeft: 10,
    },
    regionInfoColor: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 10,
        borderColor: theme.palette.text.primary,
    },
    regionInfoLabel: {
        margin: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
}));

function RegionInfoComponent(props) {
    const classes = useStyles();
    const data = props.app.state.pluginData["Region Info"];
    return (
        <Grid container direction="column" justify="flex-start" alignItems="flex-start" className={classes.regionInfoContainer}>
            <Grid container item direction="row" justify="flex-start" alignItems="center">
                <div
                    item="true"
                    style={{ backgroundColor: data.color ? data.color : props.app.themeDict.other.polyFillColorDefault }}
                    className={classes.regionInfoColor}
                />
                <Typography variant="body1" item="true">{"Name: "}{data.name ? data.name : "None"}</Typography>
            </Grid>
            <Typography item="true" variant="body2" className={classes.regionInfoLabel}>{"Label: "}{data.label ? data.label : "None"}</Typography>
        </Grid>
    );
}

const initState = scenarioData => {
    return {
        color: null,
        name: null,
        label: null,
    };
};

// Sets region info to appropriate values based on hovered on layer
function onProcessRegionHoveredOn(app, layer) {
    const regionID = layer.feature.properties.regionID;
    const color = app.state.scenarioData[app.state.activeEntry].regionDict[regionID].color;
    const name = layer.feature.properties.name;
    const label = app.state.pluginData["Legend"][app.state.activeEntry][color];
    let newRegionInfoData = {}
    newRegionInfoData.color = color ? color : null;
    newRegionInfoData.name = name ? name : null;
    newRegionInfoData.label = label ? label : null;
    app.updatePluginData("Region Info", newRegionInfoData);
}

// Resets region info to default, i.e. no region selected status
function onProcessRegionHoveredOut(app, layer) {
    app.updatePluginData("Region Info", {
        color: null,
        name: null,
        label: null,
    });
}

const RegionInfoPluginDict = {
    component: RegionInfoComponent,
    initState: initState,
    functions: {
        onAssignRegions: null,
        onAddEntry: null,
        onDeleteEntry: null,
        onUpdateActiveEntry: null,
        onUpdateEventDate: null,
        onUpdateEvent: null,
        onLoadSave: null,
        onProcessRegionHoveredOn: onProcessRegionHoveredOn,
        onProcessRegionHoveredOut: onProcessRegionHoveredOut,
    }
};

export default RegionInfoPluginDict;