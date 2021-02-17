// Import React
import React from "react";

// Import Resium
import { Viewer, GeoJsonDataSource } from "resium";

// Import default basemap geojson
import mapAdmin from "../assets/basemap/mapAdmin.json";
console.log(mapAdmin.features.length);

export default function MapComponent() {
    return (
        <Viewer full>
            {/*full ensures map takes full screen*/}
            <GeoJsonDataSource data={mapAdmin}/>
        </Viewer>
    );
}