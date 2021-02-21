import React from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-lasso";

export default function LassoComponent(props) {
    const map = useMap();

    const eventHandler = event => {
        event.layers.forEach(layer => {
            // FIXME: actions to take on each layer
        });
        // FIXME: code to return to default single fill option
    };

    React.useEffect(() => {
        // Setup lasso
        const lasso = L.lasso(map);
        lasso.setOptions({ intersect: true });

        // Execute region coloring upon lasso selection completion
        map.on('lasso.finished', eventHandler);

        return (() => {
            map.off('lasso.finished', eventHandler); // Remove event handler to avoid creating multiple handlers
        });
    }, [map]);

    // Return nothing FIXME: so I need to find a way, perhap throug props pass, to link the lasso functionaity to a button in toolbarcomponent
    return null;
}
