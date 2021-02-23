// Colors should be given in hex

const themeDict = {
    material: { // Theme object for material ui theming component FIXME: add corresponding use themeprovider thing to the app js
        palette: {
            secondary: {
                main: "#d50000",
                light: "#ff5131",
                dark: "#9b0000"
            }
        },
    },
    other: { // Theme object for map (currently done via cesium) to use, this is passed down as props to all child
        polyStrokeColor: "#A9A9A9",
        polyStrokeWeight: 0.5, // This seems to not work very well on windows for cesium
        polyFillColorDefault: "#f5f5f5",
        polyFillOpacityDefault: 0.7,
        polyFillOpacityHovered: 0.9,
        timelineMarkerSpacing: 120,
        timelineMarkerLabelWidth: 100,
    }

}

export default themeDict;