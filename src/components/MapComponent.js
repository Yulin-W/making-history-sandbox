// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import leaflet
import { MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const useStyles = theme => ({
    mapContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        zIndex: 0,
    }
});

class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseMap: props.baseMap,
        }

        // Binding methods
        this.onEachFeature = this.onEachFeature.bind(this);
        this.style = this.style.bind(this);
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

    style(feature, layer) {
        return {
            color: this.props.themeDict.polyStrokeColor,
            weight: this.props.themeDict.polyStrokeWeight,
            fillColor: this.props.getRegionColorByIndex(feature.properties.regionID),
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
        this.props.assignRegion(feature.properties.regionID);
    }

    render() {
        const { classes } = this.props;

        return (
            <MapContainer
                center={[30, 0]}
                zoom={3}
                scrollWheelZoom={true}
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
                ></GeoJSON>
            </MapContainer>
        );
    }
}

export default withStyles(useStyles)(MapComponent);