import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    regionInfoContainer: {
        width: "100%",
        paddingLeft: 10,
    },
    regionInfoColor: {
        width: 15,
        height: 15,
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
        <Grid id="region_info" container direction="column" justify="flex-start" alignItems="flex-start" className={classes.regionInfoContainer}>
            <Grid container item direction="row" justify="flex-start" alignItems="center">
                <div
                    item="true"
                    style={{ backgroundColor: data.color ? data.color : props.app.themeDictDefault.other.polyFillColorDefault }}
                    className={classes.regionInfoColor}
                />
                <Typography variant="body2" item="true">{"Name: "}{data.name ? data.name : "None"}</Typography>
            </Grid>
            <Typography item="true" variant="caption" className={classes.regionInfoLabel}>{"Label: "}{data.label ? data.label : "None"}</Typography>
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
    let newRegionInfoData = {
        color: color ? color : null,
        name: name ? name : null,
        label: label ? label : null,
    };
    app.updatePluginData("Region Info", newRegionInfoData);
}

const RegionInfoPluginDict = {
    component: RegionInfoComponent,
    initState: initState,
    functions: {
        onProcessRegionHoveredOn: onProcessRegionHoveredOn,
        // Although not having this causes the region info to linger on  after moving out of a region, it is faster and I feel that is worth is, nevertheless, try to find a solution that resolves the performance issue and ensures on moving out the region info is not set
    }
};

export default RegionInfoPluginDict;