import { Color } from "cesium";

// Function for obtaining a Cesium.Color object from hex code and opacity value, which defaults to 1
export default function cesiumColorFromHex(hex, opacity=1) {
    return Color.fromAlpha(Color.fromCssColorString(hex), opacity);
}