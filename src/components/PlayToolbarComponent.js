// Import React
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';

// Import retract button custom component
import RetractButton from './RetractButton.js';

const useStyles = makeStyles((theme) => ({
    playToolbarContainer: {
        position: "absolute",
        left: 0,
        bottom: 309, // This value should be such that the play toolbar lie just above the event box
        width: 20,
        height: 65,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        padding: 5,
        borderRightStyle: "ridge",
        borderTopStyle: "ridge",
        borderBottomStyle: "ridge",
        borderColor: theme.palette.border,
        backgroundImage: theme.palette.backgroundImage.main,
        WebkitBorderImage: theme.palette.borderImage
    },
    playToolbarButton: {
        fontSize: 16,
        margin: 0,
        padding: 0,
    }
}));

function PlayToolbarComponent(props) {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(true);
    return (
        <Slide direction="right" in={display} unmountOnExit={false} mountOnEnter={false}>
            <div className={classes.playToolbarContainer} id="playToolbar">
                <IconButton
                    className={classes.playToolbarButton}
                    onClick={() => {
                        props.updatePlaying(!props.playing, () => {
                            if (props.playing) {
                                props.pausePlaying();
                            } else {
                                props.playTimeline();
                            }
                        })
                    }}
                >
                    {props.playing ? (
                        <PauseIcon/>
                    ): (
                        <PlayIcon/>
                    )}
                </IconButton>
                <IconButton
                    className={classes.playToolbarButton}
                    onClick={() => {
                        props.stopPlaying();
                    }}
                >
                    <StopIcon/>
                </IconButton>
                <IconButton
                    className={classes.playToolbarButton}
                    onClick={() => {
                        props.changePlaySpeed();
                    }}
                >
                    {props.playSpeed + "x"}
                </IconButton>
                <RetractButton direction="left" top={"50%"} left={36} checked={display} onClick={() => setDisplay(!display)} />
            </div>
        </Slide>
    );
}

export default React.memo(PlayToolbarComponent);