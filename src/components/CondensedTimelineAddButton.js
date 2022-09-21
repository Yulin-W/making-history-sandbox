import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    addIconButtonContainerCondensedTimeline: {
        position: "absolute",
        left: 78,
        bottom: -11,
        padding: 0,
        zIndex: 1,
        transform: "scale(0.8)"
    },
    addIconButtonCondensedTimeline: {
        padding: 0,
        zIndex: 2,
        color: theme.palette.text.secondary,
    },
}));

export default function CondensedTimelineAddButton(props) {
    const classes = useStyles();
    return (
        <td>
            <div className={classes.addIconButtonContainerCondensedTimeline}>
                <IconButton size="small" className={classes.addIconButtonCondensedTimeline} onClick={(e) => { props.addEntry(props.index + 1); e.stopPropagation();}}>
                    {/*This is the fake button for visuals only*/}
                    <AddIcon></AddIcon>
                </IconButton>
            </div>
        </td>
    );
}