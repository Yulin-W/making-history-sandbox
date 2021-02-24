// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import leaflet
import { MapContainer, GeoJSON, TileLayer, AttributionControl, LayersControl } from 'react-leaflet';
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
        filter: "brightness(1) contrast(100%)",
    },
});

// Add leaflet providers here
const mapProviders = [
    {
        name: "Esri.WorldImagery",
        attr: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        src: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    },
    {
        name: "OpenTopoMap",
        attr: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        src: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    },
    {
        name: "OpenStreetMap.Mapnik",
        attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        src: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    {
        name: "Stamen.TerrainBackground",
        attr: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        src: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png'
    },
    {
        name: "Stamen.Watercolor",
        attr: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        src: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
    },
]
class MapComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            baseMap: props.baseMap,
        }
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
        this.props.assignRegions([feature.properties.regionID]);
        layer.setStyle(this.style(feature, layer)); // TODO: such setting would not highlight the region though, which might be a problem
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
                            data={this.state.baseMap}
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