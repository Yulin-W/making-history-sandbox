// Import packages
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

// Import custom components
import TimelineMarker from './TimelineMarker.js';

const useStyles = makeStyles((theme) => ({
    timelineBarContainer: {
        position: "absolute",
        width: "100%",
        height: 50,
        bottom: 0,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
    },
    timelineLine: {
        position: "absolute",
        top: 28,
        left: 0,
        height: 2,
        width: 1000,
        backgroundColor: theme.palette.text.primary,
    },
    timelineBarContentContainer: {
        display: "relative",
        height: "100%",
    },
    timelineBarMarkerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 1000,
    }
}));

// Function for listener on windows resize
function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function TimelineBarComponent(props) {
    const classes = useStyles();
    const markers = props.scenarioData.map((entry, index) =>
        <TimelineMarker key={index} index={index} label={entry.date} selected={props.activeEntry === index} updateActiveEntry={props.updateActiveEntry} themeDict={props.themeDict} />
    )
    const [width, height] = useWindowSize(); // Values that change whenever window is resized, height is not used for now, but kept in case it becomes useful TODO: if performance is getting bad, delete the height and its corresponding code in the function useWindowSize
    const lineLength = Math.max(width, (props.scenarioData.length + 1) * props.themeDict.timelineMarkerSpacing); // Take the larger of the viewport width and the length required to fit the timeline markers as the length of the timeline TODO: the issue of what I've done here is that the right end and the left end of the timeline won't match up in length when the second line length case in the max arguments is triggered, not too important, but fix it if possible
    return (
        <div className={classes.timelineBarContainer}>
            <Scrollbars className={classes.timelineBarContentContainer}>
                <div className={classes.timelineBarContentContainer}>
                    <div className={classes.timelineLine} style={{ width: lineLength }}></div>
                    <div className={classes.timelineBarMarkerContainer} style={{ width: lineLength }}>
                        {markers}
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
}