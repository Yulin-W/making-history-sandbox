// Import React
import React from "react";
import { withStyles } from '@material-ui/core/styles';

// Import color picker
import { SliderPicker } from 'react-color';

const useStyles = theme => ({
    colorBarContainer: {
        position: "absolute",
        top: 0,
        left: "35%",
        width: "30%",
        height: 50,
        zIndex: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        alignItems: "stretch",
        marginTop: 30,
        padding: 5,
        borderStyle: "ridge",
        borderColor: theme.palette.border,
        WebkitBorderImage: theme.palette.borderImage
    },
});

class ColorBarComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: "#bf4340", // Default color, it is the color when slider in first row of color bar is set to leftmost position, and the centre one of the 5 colors in the second row of the color bar is chosen
        }
    }

    render() { //FIXME: add some color tests to ensure that selected color is notified if coincides with a color already on the page
        const { classes } = this.props;
        return (
            <div className={classes.colorBarContainer} id="colorbar">
                <SliderPicker color={this.state.color} onChange={(color, event) => this.setState({color: color.hex})}/>
            </div>
        );
    }
}

export default withStyles(useStyles)(ColorBarComponent);