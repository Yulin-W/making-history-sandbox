import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    addIconButtonContainer: {
        position: "absolute",
        top: -12,
        padding: 0,
        zIndex: 1,
        transform: "scale(0.8)"
    },
    addIconButton: {
        padding: 0,
        zIndex: 2,
        color: theme.palette.text.secondary,
    },
}));

export default function TimelineAddButton(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.addIconButtonContainer} style={{left : props.themeDict.timelineMarkerSpacing/2 + 16}}>
                <IconButton size="small" className={classes.addIconButton} onClick={(e) => { props.addEntry(props.index + 1); e.stopPropagation();}}>
                    {/*This is the fake button for visuals only*/}
                    <AddIcon></AddIcon>
                </IconButton>
            </div>
        </div>
    );
}