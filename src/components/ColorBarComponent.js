// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

// Import react stuff for color info
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

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
        height: 80,
        zIndex: 2,
        display: "flex",
        justifyContent: "space-evenly",
        flexFlow: "column",
        alignItems: "center",
        marginLeft: -185,
        marginTop: 30,
        padding: 5,
        borderStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage,
    },
    colorPickerContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        flexFlow: "row",
        alignItems: "center",
        width: "100%",
        flexGrow: 1,
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
    colorInfo: {
        height: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        alignItems: "center",
        color: theme.palette.text.primary,
    },
    colorInfoTextDescriptor: {
        width: "25%",
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        alignItems: "center",
        marginRight: 10,
    },
    colorInfoTextLabel: {
        width: "50%",
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        alignItems: "center",
    },
    colorInfoLabelEntry: {
        fontSize: 14,
    },
    colorInfoHelp: {
        marginTop: 3,
        marginRight: 10,
    }
});

class ColorBarComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: "#bf4340", // Default color, it is the color when slider in first row of color bar is set to leftmost position, and the centre one of the 5 colors in the second row of the color bar is chosen
            display: true, // Default to showing the colorbar
            colorLabel: props.getColorLabel("#bf4340")
        }
    }

    render() {
        const { classes, getColorLabel, updateLegendLabel } = this.props;
        const colorHex = this.state.color;
        return (
            <Slide direction="down" in={this.state.display} unmountOnExit={false} mountOnEnter={false}>
                <div className={classes.colorBarContainer} id="colorbar">
                    <div className={classes.colorPickerContainer}>
                        <div className={classes.currentColor} style={{ backgroundColor: colorHex }} />
                        <div className={classes.sliderPickerContainer}>
                            <SliderPicker color={colorHex} onChange={(color, event) => this.setState({ color: color.hex, colorLabel: getColorLabel(color.hex) })} />
                        </div>
                        <div className={classes.compactPickerContainer}>
                            <CompactPicker className={classes.compactPicker} color={colorHex} colors={defaultColors} onChange={(color, event) => this.setState({ color: color.hex, colorLabel: getColorLabel(color.hex) })} />
                        </div>
                    </div>
                    <div className={classes.colorInfo} id="colorinfo">
                        <Tooltip
                            title={"Legend label (if any) for selected color. Edit label by clicking (alternatively use legend panel in side menu)"}
                        >
                            <div className={classes.colorInfoHelp}>
                                <HelpOutlineIcon fontSize="small"/>
                            </div>
                        </Tooltip>
                        <div className={classes.colorInfoTextDescriptor}>
                            <Typography noWrap variant="body2" item="true">{"Legend label: "}</Typography>
                        </div>
                        <div className={classes.colorInfoTextLabel}>
                            <InputBase
                                className={classes.colorInfoLabelEntry}
                                inputProps={{style: { textAlign: "center"} }}
                                value={this.state.colorLabel !== null ? this.state.colorLabel : "Not on map"}
                                fullWidth
                                onChange={e => updateLegendLabel(this.state.color, e.target.value)}
                                disabled={this.state.colorLabel !== null ? false : true}
                            />
                        </div>
                    </div>
                    <RetractButton direction="up" top={96} left={27} checked={this.state.display} onClick={() => this.setState({ display: !this.state.display })} />
                </div>
            </Slide>
        );
    }
}

export default withStyles(useStyles)(ColorBarComponent);