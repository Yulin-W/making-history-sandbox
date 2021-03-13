// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import leaflet and related libraries
import { MapContainer, GeoJSON, TileLayer, AttributionControl, LayersControl, FeatureGroup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import JsxMarker from "./JsxMarker.js";

// Import relevant custom components for plugins
import LassoComponent from "./LassoComponent.js";

// Import mapProviders settings
import mapProviders from '../settings/mapProviders.js';

// Additional imports
import cloneDeep from "clone-deep";
import generateUniqueID from "../scripts/generateUniqueID.js";
import markerIcons from "../assets/other/markerIcons.js";

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
    markerIcon: {
        width: "100%",
        height: "100%",
    }
});
class MapComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            markerData: props.getMarkerData(),
        }

        // Add references to useful entites
        this.geojsonRef = React.createRef(null);
        this.mapElement = null;

        // Binding methods
        this.onEachFeature = this.onEachFeature.bind(this);
        this.style = this.style.bind(this);
        this.resetAllRegionStyle = this.resetAllRegionStyle.bind(this);
        this.clickRegion = this.clickRegion.bind(this);
        this.highlightRegion = this.highlightRegion.bind(this);
        this.resetHighlightRegion = this.resetHighlightRegion.bind(this);
        this.resetSpecifiedRegionStyle = this.resetSpecifiedRegionStyle.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.updateMarkerPosition = this.updateMarkerPosition.bind(this);
        this.updateMarkerData = this.updateMarkerData.bind(this);
        this.updateMarkerContent = this.updateMarkerContent.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    removeMarker(markerID) {
        let currentData = cloneDeep(this.state.markerData);

        delete currentData[markerID];

        this.setState({ markerData: currentData }, () => {
            this.props.updateMarkerData(this.state.markerData);
        });        
    }

    updateMarkerPosition(markerID, position) {
        let currentData = cloneDeep(this.state.markerData);

        currentData[markerID].lat = position.lat;
        currentData[markerID].lng = position.lng;

        this.setState({ markerData: currentData }, () => {
            this.props.updateMarkerData(this.state.markerData);
        });
    }

    updateMarkerContent(markerID, content) {
        let currentData = cloneDeep(this.state.markerData);

        currentData[markerID].content = content;

        this.setState({ markerData: currentData }, () => {
            this.props.updateMarkerData(this.state.markerData);
        });        
    }

    addMarker(iconIndex, color, lat = 50, lng = 0, content = "") {
        let currentData = cloneDeep(this.state.markerData);

        // Generate a unique ID
        const id = generateUniqueID(currentData);

        currentData[id] = {
            iconIndex: iconIndex,
            color: color,
            lat: lat,
            lng: lng,
            content: content
        };
        this.setState({ markerData: currentData }, () => {
            this.props.updateMarkerData(this.state.markerData);
        });
    }

    // Updates marker data to correspond to the active entry
    updateMarkerData(callback=null) {
        this.setState({ markerData: this.props.getMarkerData() }, () => {
            if (callback) {
                callback();
            }
        });
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

        const markers = Object.entries(this.state.markerData).map(marker => {
            const Icon = markerIcons[marker[1].iconIndex];
            return (
                <JsxMarker
                    key={marker[0]}
                    markerID={marker[0]}
                    position={{
                        lat: marker[1].lat,
                        lng: marker[1].lng
                    }}
                    size={this.props.themeDict.markerSize}
                    content={marker[1].content}
                    updatePosition={this.updateMarkerPosition}
                    updateContent={this.updateMarkerContent}
                    removeMarker={this.removeMarker}
                >
                    <Icon className={classes.markerIcon} style={{ color: marker[1].color }} />
                </JsxMarker>
            );
        });

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
                whenCreated={map => {this.mapElement = map;}}
                className={classes.mapContainer}
            >
                <LayersControl position="topright">
                    {mapProviders.map((entry, index) => <LayersControl.BaseLayer key={entry.name} checked={index === 0} name={entry.name}>
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
                            smoothFactor={0}
                            ref={this.geojsonRef}
                        ></GeoJSON>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Markers">
                        <FeatureGroup key={this.props.activeEntry}>
                            {markers}
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                <AttributionControl position="bottomright" />
                {this.props.lassoSelecting && <LassoComponent updateLassoSelecting={this.props.updateLassoSelecting} assignRegions={this.props.assignRegions} />}
            </MapContainer>
        );
    }
}

export default withStyles(useStyles)(MapComponent);