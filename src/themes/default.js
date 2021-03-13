import MarbleTexture from '../assets/img/MarbleTexture.jpg';
import GoldTexture from '../assets/img/GoldTexture.png';

// Colors should be given in hex
const themeDict = {
    material: { // Theme object for material ui theming component FIXME: add corresponding use themeprovider thing to the app js
        palette: {
            type: "dark",
            secondary: {
                main: "#d50000",
                light: "#ff5131",
                dark: "#9b0000"
            },
            border: "#d4af37",
            borderImage: `url(${GoldTexture}) 30`,
            background: {
                light: "#F5F5F5",
            },
            backgroundImage: {
                main: `url(${MarbleTexture})`,
            }
        },
    },
    other: { // Theme object for map (currently done via cesium) to use, this is passed down as props to all child
        polyStrokeColor: "#36454F",
        polyStrokeWeight: 0.5,
        polyFillColorDefault: "#DCDCDC",
        polyFillOpacityDefault: 0.2,
        polyFillOpacityColored: 0.6,
        polyFillOpacityHovered: 0.9,
        timelineMarkerSpacing: 120,
        timelineMarkerLabelWidth: 100,
    }

}

export default themeDict;