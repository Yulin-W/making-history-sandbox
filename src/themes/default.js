// Colors should be given in hex

const themeDict = {
    material: { // Theme object for material ui theming component FIXME: add corresponding use themeprovider thing to the app js

    },
    other: { // Theme object for map (currently done via cesium) to use, this is passed down as props to all child
        polyStrokeColor: "#414141",
        polyStrokeWeight: 0.5, // This seems to not work very well on windows for cesium
        polyFillColorDefault: "#f5f5f5",
        polyFillOpacityDefault: 0.3,
        polyFillOpacityHovered: 0.5,
    }

}

export default themeDict;