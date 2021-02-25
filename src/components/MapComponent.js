// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import leaflet
import { MapContainer, GeoJSON, TileLayer, AttributionControl, LayersControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

// Import relevant custom components for plugins
import LassoComponent from "./LassoComponent.js";

// Import mapProviders settings
import mapProviders from '../settings/mapProviders.js';

const useStyles = theme => ({
    mapContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 45px)", // the -50px is to ensure that the map's bottom meets the timeline bar, hence if timeline bar height is adjusted, adjust map height here accordingly
        zIndex: 0,
        filter: "brightness(1) contrast(100%)",
    },
});
class MapComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.geojsonRef = React.createRef(null);
        // Binding methods
        this.onEachFeature = this.onEachFeature.bind(this);
        this.style = this.style.bind(this);
        this.resetAllRegionStyle = this.resetAllRegionStyle.bind(this);
        this.clickRegion = this.clickRegion.bind(this);
        this.highlightRegion = this.highlightRegion.bind(this);
        this.resetHighlightRegion = this.resetHighlightRegion.bind(this);
        this.resetSpecifiedRegionStyle = this.resetSpecifiedRegionStyle.bind(this);
    }

    onEachFeature(feature, layer) {
        layer.addEventListener("click", () => {
            this.clickRegion(feature, layer);
        });
        layer.addEventListener("mouseover", () => {
            if (!this.props.lassoSelecting) {
                // Ensures lasso selection is not interfered by mouse events
                this.highlightRegion(feature, layer);
                this.props.processRegionHoveredOn(layer);
            }
        });
        layer.addEventListener("mouseout", () => {
            if (!this.props.lassoSelecting) {
                // Ensures lasso selection is not interfered by mouse events
                this.resetHighlightRegion(feature, layer);
                this.props.processRegionHoveredOut(layer);
            }
        });
    }

    style(feature, layer) {
        const color = this.props.getRegionColorByIndex(feature.properties.regionID);
        return {
            color: this.props.themeDict.polyStrokeColor,
            weight: this.props.themeDict.polyStrokeWeight,
            fillColor: color ? color : this.props.themeDict.polyFillColorDefault,
            fillOpacity: color ? this.props.themeDict.polyFillOpacityColored : this.props.themeDict.polyFillOpacityDefault,
        };
    }


    hightlightStyle(feature, layer) {
        return {
            fillOpacity: this.props.themeDict.polyFillOpacityHovered
        };
    }

    highlightRegion(feature, layer) {
        layer.setStyle(this.hightlightStyle(feature, layer));
    }

    resetHighlightRegion(feature, layer) {
        layer.setStyle(this.style(feature, layer));
    }

    clickRegion(feature, layer) {
        if (this.props.picking) {
            const color = this.props.getRegionColorByIndex(feature.properties.regionID);
            if (color) {
                // if region has a color, else just do nothing
                this.props.setColorBarColor(color);
            }
        } else {
            // Picking color tool not selected, hence color region as usual
            this.props.assignRegions([feature.properties.regionID]);
            layer.setStyle(this.style(feature, layer)); // TODO: such setting would not highlight the region though, which might be a problem
        }
    }

    // Resets styles of all regions to match those of the regionDict data
    resetAllRegionStyle() {
        Object.values(this.geojsonRef.current._layers).forEach(layer => {
            layer.setStyle(this.style(layer.feature, layer));
        });
    }

    // Resets style of specified regions to match those of regionDict data
    resetSpecifiedRegionStyle(indices) {
        let layers = Object.values(this.geojsonRef.current._layers);
        indices.forEach(index => {
            let layer = layers[index];
            let feature = layer.feature;
            layers[index].setStyle(this.style(feature, layer));
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <MapContainer
                center={[30, 0]}
                zoom={3}
                scrollWheelZoom
                preferCanvas
                zoomSnap={0}
                wheelPxPerZoomLevel={120}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}
                worldCopyJump
                id="map"
                className={classes.mapContainer}
            >
                <LayersControl position="topright">
                    {mapProviders.map((entry, index) => <LayersControl.BaseLayer key={entry.name} checked={index===0} name={entry.name}>
                        <TileLayer
                            attribution={entry.attr}
                            url={entry.src}
                        ></TileLayer>
                    </LayersControl.BaseLayer>)}
                    <LayersControl.Overlay checked name="Regions">
                        <GeoJSON
                            data={this.props.baseMap}
                            style={this.style}
                            onEachFeature={this.onEachFeature}
                            ref={this.geojsonRef}
                        ></GeoJSON>
                    </LayersControl.Overlay>
                </LayersControl>
                <AttributionControl position="bottomright" />
                {this.props.lassoSelecting && <LassoComponent updateLassoSelecting={this.props.updateLassoSelecting} assignRegions={this.props.assignRegions} />}
            </MapContainer>
        );
    }
}

export default withStyles(useStyles)(MapComponent);