// Import React
import { makeStyles } from '@material-ui/core/styles';

// Import Resium
import { Viewer, GeoJsonDataSource } from "resium";

// Import scripts
import cesiumColorFromHex from "../scripts/cesiumColorFromHex";

// Import default basemap geojson
import mapAdmin from "../assets/basemap/mapAdmin.json";

const useStyles = makeStyles(theme => ({
    map: {
        zIndex: 0
    },
    cesiumCreditContainer: {
        position: "absolute",
        top: 80,
        left: 10,
        width: 140,
        height: 25,
        zIndex: 1
    },
}));

// Declaring dom element id for the container of cesium's credit content
const cesiumCreditContainerID = "cesium_credit_container";

export default function MapComponent(props) {
    const classes = useStyles();

    return (
        <div>
            <div id={cesiumCreditContainerID} className={classes.cesiumCreditContainer}></div>
            <Viewer full timeline={false} animation={false} fullscreenButton={false} creditContainer={cesiumCreditContainerID} className={classes.map}>
                <GeoJsonDataSource
                    data={mapAdmin}
                    fill={cesiumColorFromHex(props.themeDict.polyFillDefault, props.themeDict.polyFillOpacity)}
                    stroke={cesiumColorFromHex(props.themeDict.polyStroke, props.themeDict.polyStrokeOpacity)}
                    strokeWidth={props.themeDict.polyStrokeWidth}
                    onLoad={(data) => { console.log(data.entities.values); }}
                />
                {/*FIXME:so how can i use this onload funciton to set colors */}
            </Viewer>
        </div>
    );
}