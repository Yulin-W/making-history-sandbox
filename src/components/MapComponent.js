// Import React
import React from "react";

// Import Resium
import { Viewer, GeoJsonDataSource } from "resium";
import { Color } from "cesium";

// Import scripts
import cesiumColorFromHex from "../scripts/cesiumColorFromHex";

// Import default basemap geojson
import mapAdmin from "../assets/basemap/mapAdmin.json";
import themeDict from "../themes/default";

export default function MapComponent(props) {
    const [regionData, setRegionData] = React.useState();

    return (
        <Viewer full timeline={false} animation={false}>
            {/*full ensures map takes full screen*/}
            <GeoJsonDataSource
                data={mapAdmin}
                fill={cesiumColorFromHex(props.themeDict.polyFillDefault, props.themeDict.polyFillOpacity)}
                stroke={cesiumColorFromHex(props.themeDict.polyStroke, props.themeDict.polyStrokeOpacity)}
                strokeWidth={themeDict.polyStrokeWidth}
                onLoad={(data) => {console.log(data.entities.values);}}
            />
        </Viewer>
    );
}