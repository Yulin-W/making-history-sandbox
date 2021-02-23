import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-lasso";

export default function LassoComponent(props) {
    // Event handler for when lasso selection is complete
    const eventHandler = event => {
        let indices = [];
        if (event) { // Series of if statements to only record in indices the valid selected regions TODO: this seems a bit dodgy, problem is this is like one of those silently neglect mistakes types of code
            if (event.layers) {
                event.layers.forEach(layer => {
                    if (layer) {
                        if (layer.feature) {
                            if (layer.feature.properties) {
                                if (layer.feature.properties.regionID) {
                                    indices.push(layer.feature.properties.regionID);
                                }
                            }
                        }
                    }
                });       
            }
        }
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

        return (() => { // What to do on unmounting the LassoComponent
            lasso.disable(); // FIXME: bug: disabling via clicking cancel button, i.e. in the case of disabling via using the cancel button, appears to lead to the drawing of selection persisting, though that selection has no coloring effect
            map.removeEventListener('lasso.finished', eventHandler); // Remove event handler to avoid creating multiple handlers
        });
    }, [map, lasso]);

    return null;
}
