import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-lasso";

export default function LassoComponent(props) {
    const map = useMap();

    // Setup lasso
    const lasso = L.lasso(map);
    lasso.setOptions({ intersect: true });

    console.log(props.lassoSelecting);
    if (props.lassoSelecting) {
        lasso.enable();
    } else {
        lasso.enable(); // For some reason, just clicking lasso disable here does't work, I need to call enable and then disable, probably an issue with the library TODO:
        lasso.disable();
    }

    // Event handler for when lasso selection is complete
    const eventHandler = event => {
        event.layers.forEach(layer => {
            // FIXME: actions to take on each layer
        });
        // Disable lasso
        props.updateLassoSelecting(false);
    };

    React.useEffect(() => {
        // Execute region coloring upon lasso selection completion
        map.on('lasso.finished', eventHandler);

        return (() => {
            map.off('lasso.finished', eventHandler); // Remove event handler to avoid creating multiple handlers
        });
    }, [map]);

    // Return nothing FIXME: so I need to find a way, perhap throug props pass, to link the lasso functionaity to a button in toolbarcomponent
    return null;
}
