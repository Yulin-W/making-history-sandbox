// Colors should be given in hex

const themeDict = {
    material: { // Theme object for material ui theming component FIXME: add corresponding use themeprovider thing to the app js

    },
    other: { // Theme object for map (currently done via cesium) to use, this is passed down as props to all child
        polyStroke: "#414141",
        polyStrokeOpacity: 1,
        polyStrokeWidth: 2, // This seems to not work very well on windows for cesium
        polyFillDefault: "#f5f5f5",
        polyFillOpacity: 0.1,
    }

}

export default themeDict;