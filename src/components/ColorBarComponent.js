// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

// Import retract button custom component
import RetractButton from './RetractButton.js';

// Import color picker
import { SliderPicker, CompactPicker } from 'react-color';
import defaultColors from "../assets/other/defaultColors";

const useStyles = theme => ({
    colorBarContainer: {
        position: "absolute",
        top: 0,
        left: "50%",
        width: 360,
        height: 60,
        zIndex: 2,
        display: "flex",
        justifyContent: "space-between",
        flexFlow: "row",
        alignItems: "center",
        marginLeft: -185,
        marginTop: 30,
        padding: 5,
        borderStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    sliderPickerContainer: {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        alignItems: "stretch",
        width: 120
    },
    compactPickerContainer: {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        alignItems: "stretch",
        width: 245,
        margin: -22,
        transform: "scale(0.8)",
    },
    rgbInput: {
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
    },
    currentColor: {
        height: 20,
        width: 20,
        margin: 5
    },
    compactPicker: {
        backgroundColor: theme.palette.background.light,
    },
});

class ColorBarComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: "#bf4340", // Default color, it is the color when slider in first row of color bar is set to leftmost position, and the centre one of the 5 colors in the second row of the color bar is chosen
            display: true, // Default to showing the colorbar
        }
    }

    render() { //FIXME: add some color tests to ensure that selected color is notified if coincides with a color already on the page
        const { classes } = this.props;
        const colorHex = this.state.color;
        return (
            <Slide direction="down" in={this.state.display} unmountOnExit={false} mountOnEnter={false}>
                <div className={classes.colorBarContainer} id="colorbar">
                    <div className={classes.currentColor} style={{ backgroundColor: colorHex }} />
                    <div className={classes.sliderPickerContainer}>
                        <SliderPicker color={colorHex} onChange={(color, event) => this.setState({ color: color.hex })} />
                    </div>
                    <div className={classes.compactPickerContainer}>
                        <CompactPicker className={classes.compactPicker} color={colorHex} colors={defaultColors} onChange={(color, event) => this.setState({ color: color.hex })} />
                    </div>
                    <RetractButton direction="up" top={76} left={27} checked={this.state.display} onClick={() => this.setState({ display: !this.state.display })} />
                </div>
            </Slide>
        );
    }
}

export default withStyles(useStyles)(ColorBarComponent);