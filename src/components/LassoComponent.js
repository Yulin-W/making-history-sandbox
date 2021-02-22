import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-lasso";

export default function LassoComponent(props) {
    // Event handler for when lasso selection is complete
    const eventHandler = event => {
        let indices = [];
        event.layers.forEach(layer => {
            if (layer) { // Series of if statements to only record in indices the valid selected regions TODO: this seems a bit dodgy
                if (layer.feature) {
                    if (layer.feature.properties) {
                        if (layer.feature.properties.regionID) {
                            console.log(layer);
                            indices.push(layer.feature.properties.regionID);
                        }
                    }
                }
            }
        });
        props.updateLassoSelecting(false, () => {props.assignRegions(indices);})
    };

    // Setup lasso
    const map = useMap();
    const lasso = L.lasso(map);
    lasso.setOptions({ intersect: true });
    lasso.enable();

    React.useEffect(() => {
        // Execute region coloring upon lasso selection completion
        map.addEventListener('lasso.finished', eventHandler);

        return (() => {
            lasso.disable();
            map.removeEventListener('lasso.finished', eventHandler); // Remove event handler to avoid creating multiple handlers
        });
    }, [map]);

    return null;
}
