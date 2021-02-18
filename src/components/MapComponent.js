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
console.log(mapAdmin.features.length);

export default function MapComponent(props) {
    console.log(props.themeDict);

    return (
        <Viewer full timeline={false} animation={false}>
            {/*full ensures map takes full screen*/}
            <GeoJsonDataSource
                data={mapAdmin}
                fill={cesiumColorFromHex(props.themeDict.polyFillDefault, props.themeDict.polyFillOpacity)}
                stroke={cesiumColorFromHex(props.themeDict.polyStroke, props.themeDict.polyStrokeOpacity)}
                strokeWidth={themeDict.polyStrokeWidth}
            />
        </Viewer>
    );
}