// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import leaflet
import { MapContainer, GeoJSON, TileLayer, AttributionControl } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

// Import relevant custom components for plugins
import LassoComponent from "./LassoComponent.js";

const useStyles = theme => ({
    mapContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 45px)", // the -50px is to ensure that the map's bottom meets the timeline bar, hence if timeline bar height is adjusted, adjust map height here accordingly
        zIndex: 0,
    },
});
class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseMap: props.baseMap,
        }
        this.geojsonRef = React.createRef(null);
        // Binding methods
        this.onEachFeature = this.onEachFeature.bind(this);
        this.style = this.style.bind(this);
        this.getRegionColorByIndex = this.getRegionColorByIndex.bind(this);
        this.resetAllRegionStyle = this.resetAllRegionStyle.bind(this);
        this.clickRegion = this.clickRegion.bind(this);
        this.highlightRegion = this.highlightRegion.bind(this);
        this.resetHighlightRegion = this.resetHighlightRegion.bind(this);
    }

    onEachFeature(feature, layer) {
        layer.addEventListener("click", () => {
            this.clickRegion(feature, layer);
        });
        layer.addEventListener("mouseover", () => {
            this.highlightRegion(feature, layer);
        });
        layer.addEventListener("mouseout", () => {
            this.resetHighlightRegion(feature, layer);
        });
    }

    // Returns hex color for the region of the specified index
    getRegionColorByIndex(index) {
        let color = this.props.regionDict[index].color;
        // Return color hex if there is one, else if record shows null color, use the default fill color as specified in themeDict
        return color ? color : this.props.themeDict.polyFillColorDefault;
    }

    style(feature, layer) {
        return {
            color: this.props.themeDict.polyStrokeColor,
            weight: this.props.themeDict.polyStrokeWeight,
            fillColor: this.getRegionColorByIndex(feature.properties.regionID),
            fillOpacity: this.props.themeDict.polyFillOpacityDefault,
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
        this.props.assignRegions([feature.properties.regionID]);
        layer.setStyle(this.style(feature, layer)); // TODO: such setting would not highlight the region though, which might be a problem
    }

    // Resets styles of all regions to match those of the regionDict data
    resetAllRegionStyle() {
        Object.values(this.geojsonRef.current._layers).forEach(layer => {
            layer.setStyle(this.style(layer.feature, layer));
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <MapContainer
                center={[30, 0]}
                zoom={3}
                scrollWheelZoom
                zoomSnap={0}
                doubleClickZoom={false}
                zoomControl={false}
                attributionControl={false}
                className={classes.mapContainer}
            >
                <TileLayer
                    attribution='Map data: &copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Map style: &copy <a href="https://opentopomap.org/">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    noWrap
                ></TileLayer>
                <GeoJSON
                    data={this.state.baseMap}
                    style={this.style}
                    onEachFeature={this.onEachFeature}
                    ref={this.geojsonRef}
                ></GeoJSON>
                {this.props.lassoSelecting && <LassoComponent updateLassoSelecting={this.props.updateLassoSelecting} assignRegions={this.props.assignRegions}/>}
                <AttributionControl position="bottomright"/>
            </MapContainer>
        );
    }
}

export default withStyles(useStyles)(MapComponent);